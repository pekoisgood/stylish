const dotsWrapper = document.querySelector(".dots-wrapper ul");
const campaignContainer = document.querySelector(".carousel-container");

// carousel campaign
export default function campaignList(data) {
  data.data.map((campaign) => {
    const campaginWrapper = document.createElement("a");
    campaginWrapper.classList = "carousel-img-wrapper carousel--not-active";
    campaginWrapper.style.backgroundImage = `url(${campaign.picture})`;
    campaginWrapper.setAttribute("id", campaign.id);
    campaginWrapper.setAttribute("href", `/product/?id=${campaign.product_id}`);

    const campaignStoryWrapper = document.createElement("div");
    campaignStoryWrapper.classList = "story-wrapper";

    const div = document.createElement("div");
    const campaginStory = document.createElement("p");
    const campaginStoryAuthor = document.createElement("p");

    const li = document.createElement("li");
    li.classList = "carousel-dot";

    campaginStory.innerHTML =
      campaign.story
        .split("。")[0]
        .replace(new RegExp("\r?\n", "g"), `<br />`) + "。";
    campaginStoryAuthor.innerHTML = campaign.story.split("。")[1];
    li.setAttribute("id", campaign.id);

    campaignContainer
      .appendChild(campaginWrapper)
      .appendChild(campaignStoryWrapper)
      .appendChild(div)
      .appendChild(campaginStory)
      .parentNode.insertBefore(campaginStoryAuthor, campaginStory.nextSibling);

    dotsWrapper.appendChild(li, li.nextSibling);
  });
}
