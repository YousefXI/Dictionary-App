const wrapper = document.querySelector(".wrapper"),
   searchInput = wrapper.querySelector("input"),
   synonyms = wrapper.querySelector(".synonyms .list"),
   infoText = wrapper.querySelector(".info-text");

function data(result, word) {
   if (result.title) {
      infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
   } else {
      wrapper.classList.add("active");
      0;
      let definitions = result[0].meanings[0].definitions[0];
      let synonymsText = result[0].meanings[0].synonyms;

      document.querySelector(".word p").innerText = result[0].word;
      document.querySelector(".meaning span").innerText =
         definitions.definition;
      document.querySelector(".example span").innerText = definitions.example;
      synonyms.innerHTML = "";

      if (synonymsText[0] == undefined) {
         //fix undefined bug
         synonymsText.style.display = "none";
      } else {
         synonyms.parentElement.style.display = "block";
         synonyms.innerHTML = "";
         for (let i = 0; i < 5; i++) {
            // for loop only first 5 synonyms
            let tag = ` <span>${synonymsText[i]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
         }
      }
   }
   console.log(result);
}

//Fetch API function
function fetchApi(word) {
   infoText.style.color = "#000";
   infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
   let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
   // Fetching API response and returning it with parsing into js obj
   fetch(url)
      .then((res) => res.json())
      .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
   if (e.key === "Enter" && e.target.value) {
      fetchApi(e.target.value);
   }
});
