function getUsersFromDatabase(): User[] {
    // Placeholder implementation with corrected data structure
    const allProfiles: User[] = [
        {
            id: "cd678b13-ad03-4fec-a4ce-5e3c5627a29f",
            email: "user1@example.com",
            username: "user1",
            verify_email: true,
            create_profile: true,
            notification: true,
            gender: "female",
            interested_in: "female",
            location_lat: 45.5017,
            location_lng: -73.5673,
            interests: ["education", "note", "off", "poor"],
            date_of_birth: new Date("1990-01-01"),
            age_preference_min: 24,
            age_preference_max: 30,
            fame_rating_preference_min: 0.29,
            fame_rating_preference_max: 0.82,
            distance_preference: 25,
            interests_preference: ["government", "soldier"],
            is_online: false,
            last_connection: new Date("2021-01-01")
        },
        {
            id: "bc398f36-f5ab-40ef-b4fe-438c034209a7",
            email: "user2@example.com",
            username: "user2",
            verify_email: true,
            create_profile: true,
            notification: true,
            gender: "male",
            interested_in: "female",
            location_lat: 45.6,
            location_lng: -73.6,
            interests: ["race", "write"],
            date_of_birth: new Date("1992-01-01"),
            age_preference_min: 23,
            age_preference_max: 35,
            fame_rating_preference_min: 0.19,
            fame_rating_preference_max: 0.97,
            distance_preference: 7,
            interests_preference: ["then", "imagine", "staff", "age", "become"],
            is_online: false,
            last_connection: new Date("2021-01-01")
        },
        {
            id: "ea18e499-7b28-49e2-8087-9bdff3ff1d7d",
            email: "user3@example.com",
            username: "user3",
            verify_email: true,
            create_profile: true,
            notification: true,
            gender: "male",
            interested_in: "male",
            location_lat: 45.7,
            location_lng: -73.7,
            interests: ["voice", "investment", "chair", "tend"],
            date_of_birth: new Date("1985-01-01"),
            age_preference_min: 21,
            age_preference_max: 41,
            fame_rating_preference_min: 0.29,
            fame_rating_preference_max: 0.29,
            distance_preference: 27,
            interests_preference: ["professional", "number", "reality"],
            is_online: false,
            last_connection: new Date("2021-01-01")
        },
        {
            id: "ebf66117-d65a-471f-9701-9a133b37edcd",
            email: "user4@example.com",
            username: "user4",
            verify_email: true,
            create_profile: true,
            notification: true,
            gender: "non-binary",
            interested_in: "female",
            location_lat: 45.8,
            location_lng: -73.8,
            interests: ["economic", "quality", "body", "little", "today"],
            date_of_birth: new Date("1988-01-01"),
            age_preference_min: 23,
            age_preference_max: 30,
            fame_rating_preference_min: 0.27,
            fame_rating_preference_max: 0.97,
            distance_preference: 59,
            interests_preference: ["adult", "would", "almost", "fly"],
            is_online: false,
            last_connection: new Date("2021-01-01")
        }
    ];
    return allProfiles;
}

function sortUsers(users: User[], currentUser: User): User[] {
    return users.sort((a, b) => {
        // Sort by age preference
        const ageGapA = Math.abs((currentUser.date_of_birth?.getFullYear() || 0) - (a.date_of_birth?.getFullYear() || 0));
        const ageGapB = Math.abs((currentUser.date_of_birth?.getFullYear() || 0) - (b.date_of_birth?.getFullYear() || 0));

        // Sort by distance
        const distanceA = Math.sqrt(
            ((a.location_lat || 0) - (currentUser.location_lat || 0)) ** 2 +
            ((a.location_lng || 0) - (currentUser.location_lng || 0)) ** 2
        );
        const distanceB = Math.sqrt(
            ((b.location_lat || 0) - (currentUser.location_lat || 0)) ** 2 +
            ((b.location_lng || 0) - (currentUser.location_lng || 0)) ** 2
        );

        // Sort by common interests
        const commonTagsA = (a.interests_preference || []).filter(tag => (currentUser.interests || []).includes(tag)).length;
        const commonTagsB = (b.interests_preference || []).filter(tag => (currentUser.interests || []).includes(tag)).length;

        // Multi-criteria sorting with weighted approach
        const scoreA =
            (ageGapA >= currentUser.age_preference_min && ageGapA <= currentUser.age_preference_max ? 100 : 0) +
            (distanceA <= currentUser.distance_preference ? 50 : 0) +
            commonTagsA * 10;

        const scoreB =
            (ageGapB >= currentUser.age_preference_min && ageGapB <= currentUser.age_preference_max ? 100 : 0) +
            (distanceB <= currentUser.distance_preference ? 50 : 0) +
            commonTagsB * 10;

        return scoreB - scoreA;
    });
}

function filterUsers(users: User[], currentUser: User): User[] {
    return users.filter(user => {
        // Filter by age preference
        const ageGap = Math.abs((user.date_of_birth?.getFullYear() || 0) - (currentUser.date_of_birth?.getFullYear() || 0));
        if (ageGap < currentUser.age_preference_min || ageGap > currentUser.age_preference_max) return false;

        // Filter by distance
        const distance = Math.sqrt(
            ((user.location_lat || 0) - (currentUser.location_lat || 0)) ** 2 +
            ((user.location_lng || 0) - (currentUser.location_lng || 0)) ** 2
        );
        if (distance > currentUser.distance_preference) return false;

        // Filter by fame rating
        if ((user.fame_rating_preference_min || 0) < currentUser.fame_rating_preference_min ||
            (user.fame_rating_preference_max || 0) > currentUser.fame_rating_preference_max) return false;

        // Filter by common interests
        const commonTags = (user.interests_preference || []).filter(tag => (currentUser.interests || []).includes(tag)).length;
        if (commonTags === 0) return false;

        return true;
    });
}

export function getMatchingUsersForUser(user: User, filter: boolean = false): User[] {
    const allUsers = getUsersFromDatabase().filter(u => u.id !== user.id);

    const sortedUsers = sortUsers(allUsers, user);

    if (filter) {
        return filterUsers(sortedUsers, user);
    }

    return sortedUsers;
}