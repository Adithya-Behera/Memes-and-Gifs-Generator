import Random from './gifs/Random.jsx'
import Tag from './gifs/Tag.jsx'
import './Gif.css'
function App() {
  
  return (
   <div className="w-full h-screen flex flex-col">
    <div className="flex flex-wrap w-full justify-evenly ">
      <Random />
      <Tag/>
    </div>
   </div>
  );
}

export default App;
