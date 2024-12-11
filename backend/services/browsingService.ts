import UserModel from '../models/userModel';
import ActionsModel from "../models/actionsModel.ts";


export default class BrowsingService {
    public static async getMatchingUsersForUser(
        currentUserId: string,
        filter: boolean = false
    ): Promise<User[]> {
        // Fetch current user details
        const currentUser: User = await UserModel.findById(currentUserId);

        // Fetch blocked and already liked
        const filteredUserIds = (await ActionsModel.getAllInteractions(currentUserId))
            .filter(action => action.action_type === 'block' || action.action_type === 'like')
            .map(action => action.target_user_id);

        console.log(filteredUserIds);
        let matchingUsers = await UserModel.getMatchingUsersForUser(
            currentUserId, filteredUserIds, currentUser.gender!, currentUser.interested_in!);

        // Sort and filter users
        matchingUsers = await this.sortUsers(matchingUsers, currentUser);
        if (filter) {
            matchingUsers = await this.filterUsers(matchingUsers, currentUser);
        }

        return matchingUsers;
    }

    private static async sortUsers(users: User[], currentUser: User): Promise<User[]> {
        // Pre-calculate scores in parallel, but avoid multiple async calls
        const scoredUsers = await Promise.all(
            users.map(user => this.calculateMatchScore(user, currentUser).then(score => ({ user, score })))
        );

        // Sort in a single operation
        return scoredUsers
            .sort((a, b) => b.score - a.score)
            .map(({ user }) => user);
    }

    private static async calculateMatchScore(user: User, currentUser: User): Promise<number> {
        let score = 0;

        // Distance score
        const distance = this.calculateDistance(
            currentUser.location_lat || 0,
            currentUser.location_lng || 0,
            user.location_lat || 0,
            user.location_lng || 0
        );
        score += Math.max(0, 50 - (distance / currentUser.distance_preference) * 50);

        // Age preference score
        const age = this.calculateAge(user.date_of_birth);
        const agePreferenceMatch =
            age >= currentUser.age_preference_min &&
            age <= currentUser.age_preference_max;
        score += agePreferenceMatch ? 20 : 0;

        // Fame rating compatibility
        const fameRating = await this.calculateFameRating(user);
        if (fameRating >= currentUser.fame_rating_preference_min &&
            fameRating <= currentUser.fame_rating_preference_max) {
            score += 15;
        }

        // Online status bonus
        if (user.is_online) {
            score += 10;
        }

        // Recent activity bonus
        const daysSinceActive = user.last_connection ?
            (new Date().getTime() - user.last_connection.getTime()) / (1000 * 3600 * 24) : 30;
        score += Math.max(0, 10 - daysSinceActive);

        // Common interests score
        const commonInterests = (user.interests || []).filter(
            interest => (currentUser.interests || []).includes(interest)
        ).length;
        score += commonInterests * 3;

        // Interests preference score
        const commonInterestsPreference = (user.interests || []).filter(
            interest => (currentUser.interests_preference || []).includes(interest)
        ).length;
        score += commonInterestsPreference * 5;

        return score;
    }

    private static async filterUsers(users: User[], currentUser: User): Promise<User[]> {
        const results = await Promise.all(users.map(async (user) => {
            // Age filter
            const age = this.calculateAge(user.date_of_birth);
            if (age < currentUser.age_preference_min || age > currentUser.age_preference_max) {
                return false;
            }

            // Distance filter
            const distance = this.calculateDistance(
                currentUser.location_lat || 0,
                currentUser.location_lng || 0,
                user.location_lat || 0,
                user.location_lng || 0
            );
            if (distance > currentUser.distance_preference) {
                return false;
            }

            // Fame rating compatibility
            const fameRating = await this.calculateFameRating(user);
            if (fameRating < currentUser.fame_rating_preference_min || fameRating > currentUser.fame_rating_preference_max) {
                return false;
            }

            // Minimum interests match filter
            const commonInterests = (user.interests || []).filter(
                interest => (currentUser.interests_preference || []).includes(interest)
            ).length;
            if (commonInterests === 0 && currentUser.interests_preference && currentUser.interests_preference.length != 0) {
                return false;
            }
            return true;
        }));

        return users.filter((_, index) => results[index] === true);
    }

    // Utility methods (same as previous implementation)
    private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        // Haversine formula implementation
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    private static async calculateFameRating(user: User): Promise<number> {
        const userInteractions = await ActionsModel.getInteractions(user.id);
        const likes = userInteractions.filter(interaction => interaction.action_type === 'like').length;
        const dislikes = userInteractions.filter(interaction => interaction.action_type === 'dislike').length;
        if (likes + dislikes === 0) return 0;
        return (likes / (dislikes + likes) * 100);
    }

    private static toRad(degrees: number): number {
        return degrees * (Math.PI/180);
    }

    private static calculateAge(birthDate?: Date): number {
        if (!birthDate) return 0;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
}