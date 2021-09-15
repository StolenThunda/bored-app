import { createApp, reactive } from "https://unpkg.com/petite-vue?module";


Vue.component( 'v-select', VueSelect.VueSelect );


const store = reactive( {
  options: {
    type: ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"],
  },
  results: null,
  getIconColor (cost, index) {
    const val = (cost * 10) / 2;
    return index <= val ? 'text-green-500' : 'text-gray-300'
  },
  async getActivity ( e ) {
    const formData = new FormData( e.target )
    const formProps = Object.fromEntries( formData )
    console.log(formProps)
    const query = ""

    const activity = await fetch(
      `http://www.boredapi.com/api/activity`
    );
    const res = await activity.json();
    console.log( res )
    this.results = res
  }
} );
createApp( { store } ).mount( '#app' );