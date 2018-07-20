import axios from 'axios';
import cheerio from "cheerio";

interface IResponse {
  data
}

interface ICallback {
  ( error: Error, result?: Function):void
}

class Scrappy {
  base:string;
  html:string;
  $: Function;
  box: object;
  
  constructor(url:string){
    if (!(this instanceof Scrappy)) return new Scrappy(url)
    this.base = url;
  }

  async init(cb: ICallback){
      let res: IResponse;

      try {
        res = await axios.get(this.base);
        this.html = res.data;
        this.$ = cheerio.load(this.html);
        cb(undefined, this.$)
      } catch (error) {
        console.log(error);
        cb(error, undefined)
      }
  }
}

export default Scrappy