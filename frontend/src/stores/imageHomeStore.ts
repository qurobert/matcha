import {defineStore} from "pinia";

export const useImageHomeStore = defineStore('imageHomeStore', {
	state() {
		return {
			index: 0,
		}
	},
	getters: {
		getCurrentIndex: (state) => state.index
	},
	actions: {
		setIndex(index: number) {
			this.index = index;
		},
		increment() {
			this.index += 1
		},
		decrement() {
			this.index -= 1
		},
		reset() {
			this.index = 0
		}
	}
})
