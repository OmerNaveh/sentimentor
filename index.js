const button = document.getElementById("checkSentiment");
const div = document.getElementById("result");
button.addEventListener("click",(e)=>useApi());

async function useApi()
{
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
