const socket = io();



function hideOtherFrames(exceptFrame) {
  document.querySelectorAll(".frame").forEach(frame => {
    if (frame.classList[0] !== exceptFrame.classList[0]) {
      frame.style.display = "none"
    }
  })
}

const showFrame = (name) => {
  document.querySelector(`.${name}`).style.display = "block"
  hideOtherFrames(document.querySelector(`.${name}`))
}




var avatar = null
const non = `<div class="owned-cosmetic">
            <div class="minilager" style="background-size: 150%;background-color: #c2a499;background-image: url(charactertransparent.png); border: solid 1px darkblue;"></div>
            <div class="minilager" style="background-size: 150%;background-image: url(cosmetics/blueshirt.png);"></div>
          </div>`



const cosmetics = {
  blueshirt: {
    filename: "cosmetics/blueshirt.png",
    namne: "Blue shirt",
    layer: "clayer2"
  },
  jacket: {
    filename: "cosmetics/jacket.png",
    namne: "Black Jacket",
    layer: "clayer3"
  },
  blackshorts: {
    filename: "cosmetics/blackshorts.png",
    namne: "Black Shorts",
    layer: "clayer4"
  },
  character: {
    filename: "charactertransparent.png",
    name: "Character",
    layer: "clayer1"
  },
  nothing: {
    filename: "",
    name: "Nothing",
    layer: "layer3"
  },
  frame1: {
    filename: "cardouter.png",
    name: "Default frame",
    layer: "layer3"
  },
  redbackground: {
    filename: "redbackground.png",
    name: "Red background",
    layer: "layer1"
  },
  blueredhat: {
    filename: "cosmetics/hatcosmetic.png",
    name: "Blue and Red Hat",
    layer: "clayer6"
  },
  glasses: {
    filename: "cosmetics/glasses.png",
    name: "Default Glasses",
    layer: "clayer5"
  }
}



class Cosmetic {
  constructor(cosmetic) {
    this.element = document.createElement("div")
    this.element.className = "owned-cosmetic"
    this.element.innerHTML = `<div class="minilager" style="background-size: 150%;background-color: #c2a499;background-image: url(charactertransparent.png); border: solid 1px darkblue;"></div>
            <div class="minilager" style="background-size: 150%;background-image: url(${cosmetic.filename});"></div>`
    this.inUse = false
    this.cosmetic = cosmetic
    this.element.onclick = () => {
      if (this.inUse == true) {
        this.unUse()
      } else {
        this.use()
      }
    }
    document.querySelector(".owned-cosmetics").append(this.element)

    this.code = `loading`
  }

  use() {
    this.inUse = true

    avatar[this.cosmetic.layer] = this.cosmetic
    this.element.firstChild.style.backgroundColor = "#4569cc"
    avatar.apply()
  }

  unUse()  {
    this.inUse = false
    avatar[this.cosmetic.layer] = cosmetics.nothing
    this.element.firstChild.style.backgroundColor = "var(--mainbackgroundcolor2)"
    avatar.apply()
  }

  delete() {
    this.element.remove()
  }

}

class Outfit {
  constructor() {
    this.layer1 = cosmetics.nothing,
    this.clayer1 = cosmetics.character,
    this.clayer2 = cosmetics.nothing,
    this.clayer3 = cosmetics.nothing,
    this.clayer4 = cosmetics.nothing
    this.clayer5 = cosmetics.nothing
    this.clayer6 = cosmetics.nothing
    this.layer3 = cosmetics.nothing
  }

  apply() {
    this.code = `
            <div class="lager lager1">
              <div class="cardcolor lager " style="background-image: url(${this.layer1.filename});"></div>
            </div>
            <div class="lager lager2">
              <div class="cosmetic lager clager1" style="background-image: url(${this.clayer1.filename});"></div>
              <div class="cosmetic lager clager2" style="background-image: url(${this.clayer2.filename});"></div>
              <div class="cosmetic lager clager3" style="background-image: url(${this.clayer3.filename});"></div>
              <div class="cosmetic lager clager4" style="background-image: url(${this.clayer4.filename});"></div>
              <div class="cosmetic lager clager4" style="background-image: url(${this.clayer5.filename});"></div>
              <div class="cosmetic lager clager4" style="background-image: url(${this.clayer6.filename});"></div>
            </div>
            <div class="lager lager3">
              <div class="cardouter" style="background-image: url(${this.layer3.filename});"></div>
            </div>
          `
    document.querySelector(".displayAvatar").innerHTML = this.code
  }
}

let defaultOutfit = new Outfit()
avatar = defaultOutfit
avatar.apply()
let blueShirt = new Cosmetic(cosmetics.blueshirt)
let frame1 = new Cosmetic(cosmetics.frame1)
let blackShorts = new Cosmetic(cosmetics.blackshorts)
let jacket = new Cosmetic(cosmetics.jacket)
let redbackground = new Cosmetic(cosmetics.redbackground)
let blueandredhat = new Cosmetic(cosmetics.blueredhat)
let glasses = new Cosmetic(cosmetics.glasses)


function saveProfile() {
  socket.emit("saveProfile", {
    username: document.querySelector(".name-input").value,
    description: document.querySelector(".desc-input").value
  })
  let btn = document.querySelector(".save-input")

  btn.style.background = "gray"
  btn.disabled = false
}

socket.on("saveProfileResponse", () => {
  let btn = document.querySelector(".save-input")

  btn.style.background = "#3f3fca"
  btn.disabled = false
})

