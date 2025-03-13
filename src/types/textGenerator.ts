interface Quote{
    id : number;
    quote: string;
    author: string;
}
class TextGenerator{
  defaultText : string[]= [
    "apple", "banana", "cherry", "dragon", "elephant",
    "forest", "guitar", "hammer", "island", "jungle",
    "kitten", "lemon", "mountain", "notebook", "ocean",
    "pencil", "quartz", "river", "shadow", "tiger",
    "umbrella", "violet", "whisper", "xylophone", "yellow",
    "zebra", "bridge", "castle", "desert", "emerald",
    "fountain", "glacier", "horizon", "ivory", "jasmin",
    "kingdom", "lantern", "meadow", "nest", "orchid",
    "prairie", "quilt", "rainbow", "stream", "thunder",
    "valley", "willow", "xenon", "yogurt", "zephyr",
    "anchor", "beacon", "canyon", "dolphin", "eagle",
    "falcon", "garden", "harbor", "igloo", "jacket",
    "koala", "lizard", "magnet", "noodle", "oasis",
    "pebble", "quest", "rocket", "saddle", "tunnel",
    "vortex", "wagon", "xerox", "yarn", "zipper",
    "boulder", "cricket", "daisy", "engine", "feather",
    "giraffe", "hollow", "insect", "jewel", "kettle",
    "ladder", "mosaic", "needle", "oxygen", "parrot",
    "riddle", "spider", "trumpet", "velvet", "window"
  ];
    text: string[] = this.defaultText;

    async fetchQoute(){
        const url = "https://qapi.vercel.app/api/random";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json();
          const quoteData: Quote = {
            id: json.id,
            quote: json.quote,
            author: json.author,
          };
          const newText = quoteData.quote.split(" ");
          this.text = this.text.concat(newText);
          
          console.log(json);
        } catch (error) {
          console.error(error);
          this.text=this.defaultText;
        }
    }
    async makeText(): Promise<string[]> {
      try{
        this.text=[];
          while (this.text.length<60){
            await this.fetchQoute();
            console.log("fetching");
          }

        

      }
      catch{
        console.log(console.error());
        this.text=this.defaultText;
      }
      return this.text
        
    }
}
export default TextGenerator;