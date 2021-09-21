const button = document.getElementById("checkSentiment");
const div = document.getElementById("result");
button.addEventListener("click",(e)=>useApi());

async function useApi()
{
    try{

        const polarTag= document.getElementById("polarity");
        const typeTag = document.getElementById("type");
        polarTag.textContent= "Polarity: " ; //resets tags value every time you click
        typeTag.textContent= "Type: ";
        const text =document.getElementById("userText").value;
        const img = document.getElementById("loading");
        img.style.display="block"; //show loading image
        const sentiment = await fetch("https://sentim-api.herokuapp.com/api/v1/",{ 
            method: "POST",
            headers: {
                Accept: "application/json", 
            "Content-Type": "application/json",},
            body: JSON.stringify({"text": text}),
        })
        if(!sentiment.ok)
        {
            const status = sentiment.status;
            getCatpic(status);
        }
        else{ 
            const insertCat= document.getElementById("cat");
            insertCat.style.display="none";
            insertCat.src= "";}
        const jsonSentiment = await sentiment.json();
        img.style.display= "none"; //remove loadig image
        const polarity = JSON.stringify(jsonSentiment.result.polarity);
        const type = JSON.stringify(jsonSentiment.result.type);
        polarTag.textContent += polarity;
        typeTag.textContent += type;
        switch (type) //change text color based on type
        {
            case `"positive"`:
                polarTag.style.color= "green";
                typeTag.style.color= "green";
                break;
            case `"neutral"`:
                polarTag.style.color= "grey";
                typeTag.style.color= "grey";
                break;
            case `"negative"`:
                polarTag.style.color= "red";
                typeTag.style.color= "red";
                break;
        }
    }
    catch(error){
        const polarTag= document.getElementById("polarity");
        const typeTag = document.getElementById("type");
        polarTag.textContent=error.message;
        typeTag.textContent=error.message;
        const img = document.getElementById("loading");
        img.style.display="none"; //dont show loading image
    }
}
async function getCatpic(status) //display cat pic
{
    const insertCat= document.getElementById("cat");
    insertCat.style.display="block"
    insertCat.src= `https://http.cat/${status}`;
}
            