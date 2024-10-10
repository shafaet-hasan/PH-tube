const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) =>displayCategories(data.categories) )
    .catch((error)=>console.log(error))
}

const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item)=>{
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
        `
         <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
       ${item.category}
      </button>
    
        `
        // button.classList = "btn";
        // button.innerText = item.category;
        categoryContainer.append(buttonContainer);
    })
}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let btn of buttons) {
      btn.classList.remove("active");
    }
  };

  const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };

const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        removeActiveClass();
  
        
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category);
      })
      .catch((error) => console.log(error));
  };

const loadvideos = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) =>displayVideos(data.videos) )
    .catch((error)=>console.log(error))
}
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        
          <img src="assets/Icon.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
        </div>`;
      } else {
        videoContainer.classList.add("grid");
      }
    
    videos.forEach((video)=>{
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}/>
      ${
        video.others.posted_date?.length == 0
          ? `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1"> Just Updated </span>`
          : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(
              video.others.posted_date
            )}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
            <img class="w-10 h-10 object-cover rounded-full" src =${video.authors[0].profile_picture}/>
        </div>
        <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
                <p class="text-gray-400 font-semibold">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true || "" ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />' : ""}
            </div>
            
        </div>
      
   
  </div>`;
        videoContainer.append(card);
    })
}
function getTimeString(time) {
    const year = Math.floor(time/31536000);
    let remainingSecond = time % 31536000;
    
    // Calculate days
    const day = Math.floor(remainingSecond / 86400);
    remainingSecond = time % 86400;

    // Calculate hours from the remaining seconds
    const hour = Math.floor(remainingSecond / 3600);
    remainingSecond = remainingSecond % 3600;

    // Calculate minutes from the remaining seconds
    const minute = Math.floor(remainingSecond / 60);

    // Remaining seconds
    const second = remainingSecond % 60;

    // Return an object with day, hour, minute, and second
    if(time >= 31536000){
        return `${year} year ${day} day ${hour} hour  ${minute} minute ${second} second ago`
    }
    else if(time >= 86400){
        return `${day} day ${hour} hour  ${minute} minute ${second} second ago`
    }
    else{
        return `${hour} hour  ${minute} minute ${second} second ago`}
}
loadCategories();
loadvideos();