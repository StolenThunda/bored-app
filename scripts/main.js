import { createApp, reactive } from "https://unpkg.com/petite-vue?module";


Vue.component( 'v-select', VueSelect.VueSelect );
const serialize = function ( obj ) {
  let str = [];
  for ( let p in obj )
    
    if ( obj.hasOwnProperty( p ) ) {
      if ( obj[p] === '' ) continue
      str.push( encodeURIComponent( p ) + "=" + encodeURIComponent( obj[p] ) );
    }
  const returnStr = str.join( "&" );
  console.log( 'ret', returnStr )
  return returnStr !== '' ? '?' + returnStr : returnStr
}

const store = reactive( {
  formData: {},
  getFormData: () => { return this.formData },
  options: {
    type: ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"],
    price: {
      min: 0,
      max: 1,
      step: 0.1
    }
  },
  results: null,
  getIconColor (cost, index) {
    const val = (cost * 10) / 2;
    return index <= val ? 'text-green-500' : 'text-gray-300'
  },
  async getActivity ( e ) {
    this.formData = new FormData( e.target )
    const formProps = Object.fromEntries( this.formData )
    console.log(formProps)
    

    const activity = await fetch(
      `http://www.boredapi.com/api/activity${serialize(formProps)}`
    );
    const res = await activity.json();
    console.log( res )
    this.results = res
  }
} );
createApp( { store } ).mount( '#app' );