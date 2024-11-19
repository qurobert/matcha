import {defineStore} from "pinia";
import _ from "lodash";
import { viewDepthKey } from "vue-router";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as TargetUser
    }),
    getters: {
        getUser: (state: any)=> {
            if (!_.isEmpty(state.user))
                return state.user;
            // TODO: Fetch user from API
            const fakeUser = {
                id: 2,
                first_name: "John",
                last_name: "Doe",
                date_of_birth: '1990-01-01',
                gender: 'men',
                interested_in: 'both',
                biography: "Je suis une biographie me concernant",
                location: "Saint-Guyomard, Vannes, Morbihan, Bretagne, France métropolitaine, 56460, France",
                interests: ['Music', 'Sport', 'Cinema', 'Jesus', 'Sex', 'Drugs', 'Ethereum'],
                pictures: ["/bgé.jpg", "/cagoulé.png", "/mocheté.png", "/prisonnié.png"],
                is_online: false,
                last_connection: "2021-01-01",
            }
            state.user = fakeUser;
            return fakeUser;
        }
    },
    actions: {
        resetStore() {
            this.user = {} as TargetUser;
        },
        storeUser(user: TargetUser) {
            this.user = user;
        }
    }
})
