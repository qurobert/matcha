import {defineStore} from "pinia";

export const useFormStore = defineStore('form', {
	state: () => ({
		form: {} as Record<string, string>,
		index_page: 0,
		max_page: 0,
	}),
	actions: {
		// Form data
		getFormData(formName: string) {
			return this.form[formName];
		},
		getForm() {
			return this.form;
		},
		storeData(formName: string, formData: string) {
			this.form[formName] = formData;
		},
		setFormValues(formDatas: Record<string, string>) {
			for (const [formName, formData] of Object.entries(formDatas)) {
				this.form[formName] = formData;
			}
		},
		clearData(formName: string) {
			delete this.form[formName];
		},
		clearAllData() {
			this.form = {};
		},

		// Page index
		getPageIndex() {
			return this.index_page;
		},
		incrementPageIndex() {
			this.index_page = this.index_page + 1;
		},
		decrementPageIndex() {
			this.index_page = this.index_page - 1;
		},
		getMaxPage() {
			return this.max_page;
		},
		setMaxPage(maxPage: number) {
			this.max_page = maxPage;
		}
	},
})