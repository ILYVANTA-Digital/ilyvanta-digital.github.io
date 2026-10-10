import type { MetadataRoute } from 'next';
export default function manifest():MetadataRoute.Manifest{return {name:'ILYVANTA Digital',short_name:'ILYVANTA',description:'Websites, business software and AI workflows.',start_url:'/',display:'browser',background_color:'#ffffff',theme_color:'#09191f',icons:[{src:'/icon.svg',sizes:'any',type:'image/svg+xml'}]};}
