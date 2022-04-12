//Defining global variables
const isVisible = "is-visible";
const instaLogoPath = "resources/instagram-logo.svg";
const facebookLogoPath = "resources/facebook.svg";
const instaLink = "https://instagram.com/embedsocial/";
const facebookLink = "https://www.facebook.com/EmbedSocial/";
var loadMoreStartIndex = 4;
var loadMoreEndIndex = 8;

//Replace dummy data with real
function onLoad() {
  loadJSON(
    "resources/data.json",
    function (data) {
      //Querying elements
      var cards = document.querySelectorAll(".card");
      var usernames = document.querySelectorAll(".username");
      var profileImgs = document.querySelectorAll(".profile-img");
      var dates = document.querySelectorAll(".date");
      var logos = document.querySelectorAll(".logo");
      var images = document.querySelectorAll(".main-img");
      var captions = document.querySelectorAll(".caption");
      var likes = document.querySelectorAll(".like-number");
      var heartImgs = document.querySelectorAll(".heart-logo");
      var heartButtons = document.querySelectorAll(".heart-img");

      //Looping through to set real data
      for (var i = 0; i < cards.length; i++) {
        usernames[i].innerHTML = data[i].name;
        profileImgs[i].src = data[i].profile_image;
        dates[i].innerHTML = new Date(data[i].date).toShortFormat();
        if (data[i].source_type == "instagram") {
          logos[i].src = instaLogoPath;
          logos[i].setAttribute(
            "onclick",
            'window.open("'+instaLink+'")'
          );
        } else {
          logos[i].src = facebookLogoPath;
          logos[i].setAttribute(
            "onclick",
            'window.open("'+facebookLink+'")'
          );
        }
        images[i].src = data[i].image;
        captions[i].innerHTML = data[i].caption;
        if (data[i].caption.length > 200) {
          captions[i].innerHTML =
            captions[i].innerHTML.substring(0, 200) + "...";
        }
        likes[i].innerHTML = data[i].likes;
        heartButtons[i].setAttribute(
          "onclick",
          'like("' + heartImgs[i].id + '", "' + likes[i].id + '")'
        );
        images[i].setAttribute(
          "onclick",
          'openModal("' +
            images[i].src.substring(24) +
            '", "' +
            heartImgs[i].id +
            '", "' +
            likes[i].id +
            '")'
        );
      }
    },
    function (err) {
      console.error(err);
    }
  );
}

//Like functionality
function like(heartlogo, likenumber) {
  heart = document.querySelectorAll('[id="' + heartlogo + '"]');
  likecount = document.querySelectorAll('[id="' + likenumber + '"]');
  for (var i = 0; i < heart.length; i++) {
    if (heart[i].src.search("heart-red.svg") == -1) {
      heart[i].src = "resources/heart-red.svg";
      likecount[i].innerHTML = parseFloat(likecount[i].innerHTML) + 1;
    } else {
      heart[i].src = "resources/heart.svg";
      likecount[i].innerHTML = parseFloat(likecount[i].innerHTML) - 1;
    }
  }
}

//Loading 4 more cards
function loadMore() {
  loadJSON(
    "resources/data.json",
    function (data) {
      while (
        loadMoreStartIndex < loadMoreEndIndex &&
        loadMoreEndIndex < data.length + 4
      ) {
        //Card and Container
        var row = document.getElementById("row1");
        var card = document.createElement("div");
        card.classList.add("card");

        var container = document.createElement("div");
        container.classList.add("container");

        //Title
        var title = document.createElement("div");
        title.classList.add("title");
        var profileImg = document.createElement("img");
        profileImg.classList.add("profile-img");
        profileImg.src = data[loadMoreStartIndex].profile_image;

        var profileInfo = document.createElement("div");
        profileInfo.classList.add("profile-info");

        var username = document.createElement("span");
        username.classList.add("username");
        username.innerHTML = data[loadMoreStartIndex].name;

        var br = document.createElement("br");

        var date = document.createElement("span");
        date.classList.add("date");
        date.innerHTML = new Date(data[loadMoreStartIndex].date).toShortFormat();

        var logo = document.createElement("img");
        logo.classList.add("logo");
        if (data[loadMoreStartIndex].source_type == "instagram") {
          logo.src = instaLogoPath;
          logo.setAttribute(
            "onclick",
            'window.open("'+instaLink+'")'
          );
        } else {
          logo.src = facebookLogoPath;
          logo.setAttribute(
            "onclick",
            'window.open("'+facebookLink+'")'
          );
        }

        //Image and Caption
        var image = document.createElement("img");
        image.classList.add("main-img");
        image.src = data[loadMoreStartIndex].image;

        var caption = document.createElement("p");
        caption.classList.add("caption");
        caption.innerHTML = data[loadMoreStartIndex].caption;
        if (data[loadMoreStartIndex].caption.length > 200) {
          caption.innerHTML = caption.innerHTML.substring(0, 200) + "...";
        }

        var hr = document.createElement("hr");

        //Likes
        var likeContainer = document.createElement("div");
        likeContainer.classList.add("likes");

        var heartButton = document.createElement("button");
        heartButton.classList.add("heart-img");
        var heartImg = document.createElement("img");
        heartImg.id = "heart" + (loadMoreStartIndex + 1);
        heartImg.src = "resources/heart.svg";
        heartImg.classList.add("heart-logo");

        heartButton.appendChild(heartImg);

        var likeCounter = document.createElement("div");
        likeCounter.classList.add("like-number");
        likeCounter.id = "likenumber" + (loadMoreStartIndex + 1);
        likeCounter.innerHTML = data[loadMoreStartIndex].likes;

        //Setting attributes
        heartButton.setAttribute(
          "onclick",
          'like("' + heartImg.id + '", "' + likeCounter.id + '")'
        );
        image.setAttribute(
          "onclick",
          'openModal("' +
            image.src.substring(24) +
            '", "' +
            heartImg.id +
            '", "' +
            likeCounter.id +
            '")'
        );
        
        //Creating card
        likeContainer.appendChild(hr);
        likeContainer.appendChild(heartButton);
        likeContainer.appendChild(likeCounter);

        profileInfo.appendChild(username);
        profileInfo.appendChild(br);
        profileInfo.appendChild(date);

        title.appendChild(profileImg);
        title.appendChild(profileInfo);
        title.appendChild(logo);

        container.appendChild(title);
        container.appendChild(image);
        container.appendChild(caption);
        container.appendChild(likeContainer);

        card.appendChild(container);
        row.appendChild(card);

        loadMoreStartIndex++;
      }
      loadMoreEndIndex += 4;
    },
    function (err) {
      console.error(err);
    }
  );
}

//Opening specific modal on image click
function openModal(id, heartImgId, likeNumberId) {
  loadJSON(
    "resources/data.json",
    function (data) {
      //Querying elements
      var el = data.find((x) => x.image.substring(24) === id);
      var username = document.querySelector(".modal-username");
      var profileImg = document.querySelector(".modal-profile-img");
      var date = document.querySelector(".modal-date");
      var logo = document.querySelector(".modal-logo");
      var image = document.querySelector(".modal-main-img");
      var caption = document.querySelector(".modal-caption");
      var like = document.querySelector(".modal-like-number");
      var originLike = document.getElementById(likeNumberId);
      var heartImg = document.querySelector(".modal-heart-logo");
      var originHeartImg = document.getElementById(heartImgId);
      var heartButton = document.querySelector(".modal-heart-button");

      //Setting modal values;
      username.innerHTML = el.name;
      profileImg.src = el.profile_image;
      date.innerHTML = new Date(el.date).toShortFormat();
      if (el.source_type == "instagram") {
        logo.src = instaLogoPath;
        logo.setAttribute(
            "onclick",
            'window.open("'+instaLink+'")'
        );
      } else {
        logo.src = facebookLogoPath;
        logo.setAttribute(
            "onclick",
            'window.open("'+facebookLink+'")'
        );
      }
      image.src = el.image;
      caption.innerHTML = el.caption;
      like.innerHTML = originLike.innerHTML;
      like.id = likeNumberId;
      heartImg.id = heartImgId;
      heartImg.src = originHeartImg.src;

      heartButton.setAttribute(
        "onclick",
        'like("' + heartImg.id + '", "' + like.id + '")'
      );

      //Opening modal
      document.getElementById("modal1").classList.add(isVisible);

      //Closing via Esc key
      document.addEventListener("keyup", e => {
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
          document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
      });
    },
    function (err) {
      console.error(err);
    }
  );
}

//Closing modal on click
function closeModal() {
  document.getElementById("modal1").classList.remove(isVisible);
}

//Loading JSON file
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success) success(JSON.parse(xhr.responseText));
        } else {
          if (error) error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

//Prototyping to introduce custom date formatting
Date.prototype.toShortFormat = function() {

    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];
    
    let day = this.getDate();
    
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];
    
    let year = this.getFullYear();
    
    return `${day} ${monthName} ${year}`;  
}