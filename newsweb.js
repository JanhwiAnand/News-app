const API_KEY="7cf5ec01a7414b36bb54bb2230241adc";
const url="https://newsapi.org/v2/everything?q=";//query will be added
//a format is there in which a query is present and apikey is also present
//window has a load event
function reload(){
    window.location.reload();
}
window.addEventListener("load",()=>fetchNews("India"));

async function fetchNews(query)//whaterver query will be added, the news will be broudht related to those queries
{
    //fetch liberary is used to fetch the news and we have to await it as it returns a promise
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`)//url is added in this fetch but not directly, 1st add the url and then apikey..use string template
    //fetch returns the promise to give the news
    //convert it into json
    const data=await res.json();
    console.log(data);
    //bind the data and data is given in form of articels(in the output it was given article)
    bindData(data.articles);
}
    function bindData(articles){//as many number of articles are there as many times we have to make the template
        //for that purpose make the close of template and go on adding it to card(in html)
        const cardsContainer=document.getElementById('card-container');
        const newsCardTemplate=document.getElementById('template-news-card');
        cardsContainer.innerHTML="";//it is set as empty as whenever binddata will be done then large number of cards will go on adding(if already 100 cards are there then when api called then after that more 100 cards will be joined so to avoid this make it as empty)
        //foreachloop used
        articles.forEach(article=>{
            //to avoid the news which don't has any image
            if(!article.urlToImage) return;
            const cardClone=newsCardTemplate.content.cloneNode(true);//deep cloning->not only one div....all the divs should be cloned(inside card)

            //place the images and the ddescription,title etc in the image..so function called
            fillDataInCard(cardClone,article);
            cardsContainer.appendChild(cardClone);
            
        });
    }

    function fillDataInCard(cardClone,article){
        const newsImg=cardClone.querySelector("#news-img");
        const newsTitle=cardClone.querySelector("#news-title");
        const newsSource=cardClone.querySelector("#news-source");
        const newsDesc=cardClone.querySelector("#news-desc");

        //to add image
        newsImg.src=article.urlToImage;
        //to set article
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;//these come from api

        //to add date and timezone

        // const date=new Date(article.publisedAt).toLocaleString("en-US",{
        //     timeZone:"Asia/Jakarata"
        // });
        const date=new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta",
        })

        newsSource.innerHTML=`${article.source.name} · ${date}`;

        //to add link

        cardClone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank");//in api, in article.url contains the link of the news
        });

    }
    let curSelectedNav=null;
    function onNavItemClick(id){
        fetchNews(id);
        const navItem=document.getElementById(id);
        curSelectedNav?.classList.remove("active");//if not null then remove active(when clicked on new nav  then remove active from old and add active to new)
        curSelectedNav=navItem;
        curSelectedNav.classList.add("active");
    }
    //handling search part
    const searchButton=document.getElementById('search-button');
    const searchText=document.getElementById('search-text');
    searchButton.addEventListener('click',()=>{
        const query=searchText.value;
        if(!query) return;
        fetchNews(query);//if nothing searched the do nothing

        //when something searched then active should be removed
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;

    })
   
