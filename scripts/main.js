import { createApp, reactive } from "https://unpkg.com/petite-vue?module";

const store = reactive( {
  results: null,
  getIconColor (cost, index) {
    const val = (cost * 10) / 2;
    return index <= val ? 'text-green-500' : 'text-gray-300'
  },
  
  async getActivity () {
    const activity = await fetch(
      `http://www.boredapi.com/api/activity`
    );
    const res = await activity.json();
    console.log( res )
    this.results = res
  }
} );
createApp( { store } ).mount( '#app' );