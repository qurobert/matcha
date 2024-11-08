import {defineStore} from "pinia";
import _ from "lodash";
import { viewDepthKey } from "vue-router";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as User
    }),
    getters: {
        getUser: (state: any) => {
            if (!_.isEmpty(state.user))
                return state.user;
            // TODO: Fetch user from API
            const fakeUser = {
                id: 1,
                first_name: "John",
                last_name: "Doe",
                date_of_birth: '1990-01-01',
                gender: 'men',
                interested_in: 'both',
                biography: "Je suis une biographie me concernant",
                location: "Paris",
                interests: ['Music', 'Sport', 'Cinema', 'Jesus', 'Sex', 'Drugs', 'Ethereum'],
                pictures: ["/bgé.jpg", "/cagoulé.png", "/mocheté.png", "/prisonnié.png"],
                online: false,
                last_connection: "2021-01-01",
                liked: true,
                viewed: true

            }
            state.user = fakeUser;
            return fakeUser;
        }
    },
    actions: {
        resetStore() {
            this.user = {} as User;
        },
        storeUser(user: User) {
            this.user = user;
        }
    }
})
