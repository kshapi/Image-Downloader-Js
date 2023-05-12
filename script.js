const image = document.querySelector('.image img');
const searchValue = document.querySelector('.search input');
const searchBtn = document.querySelector('.search-btn ');
const refreshBtn = document.querySelector('.refresh-btn ');
const loader = document.querySelector('.loader');
const downloadBtn = document.querySelector('.download-btn');
const error = document.querySelector('.error');

let blobUrl;

//Fetch Url
const fetchUrl = async () => {
  loader.style.display = 'block';
  const search = searchValue.value ? searchValue.value : 'random';
  
  try {
    const res = await fetch(`https://source.unsplash.com/random/900x1000/?${search}`);
    
    if (res.ok) {
      const url = await res.url;
      const blob = await res.blob()
      
      blobUrl = blob;
      image.src = res.url;
      loader.style.display = 'none';
      error.style.display = 'none';
    };
    
  } catch (e) {
    loader.style.display = 'none';
    error.style.display = 'block';
    error.innerText = e.message;
  };
  
};
fetchUrl()
searchBtn.addEventListener('click',fetchUrl);
refreshBtn.addEventListener('click',fetchUrl);


//Download Image
const download = () => {
  //ReadFile 
  const reader = new FileReader()
  reader.readAsDataURL(blobUrl);
  reader.onprogress = ()=>{
    console.log(reader.readyState)
  }
  reader.addEventListener('load',()=> {
    const link = document.createElement('a')
    link.href = reader.result;
    link.download = 'download';
    link.click();
  });
  
};
downloadBtn.addEventListener('click',download);

//Kshapii