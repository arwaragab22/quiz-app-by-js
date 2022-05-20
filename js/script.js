// fetch data from json file 
let index = 0;
let right = 0;
let lengthtest;
loadDoc();
function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let test = JSON.parse(this.responseText);


            lengthtest = test.length;
            count(lengthtest, index);
            showquestion(test[index], lengthtest);
            document.querySelector(".right").innerHTML = right;
            if (right >= 0 && right <= 3) {
                document.querySelector(".status").innerHTML = "bad";
            }
            else if (right > 3 && right <= 6) {
                document.querySelector(".status").innerHTML = "mid";
            }
            else {
                document.querySelector(".status").innerHTML = "perfect";
            }
            checkbullet(index);


        }

    }
    xhttp.open("GET", "quiz.json", true);
    xhttp.send();

}
loadDoc();
function showquestion(t, l) {
    document.querySelector(".answer").innerHTML = "";
    document.querySelector(".quistion").innerText = "";
    document.querySelector(".quistion").innerText = t.title + " " + ":";
    for (let j = 1; j <= 4; j++) {
        let newdiv = document.createElement("div");
        let newinput = document.createElement("input");
        let newlabel = document.createElement("label");
        newinput.type = "radio";
        newinput.id = `answer_${j}`;

        newlabel.htmlFor = `answer_${j}`;
        newlabel.innerText = t["answer_" + j];
        newinput.name = "answer";
        newinput.dataset.answer = t.right_answer;
        newinput.value = t["answer_" + j];
        newlabel.className = "answerdiv";

        newdiv.appendChild(newinput);
        newdiv.appendChild(newlabel);
        let newbr = document.createElement("br");
        document.querySelector(".answer").appendChild(newdiv);




    }


}
function count(l, ind) {
    document.querySelector(".count").innerHTML = ind + 1;
    document.querySelector(".from").innerHTML = l;
    document.querySelector(".bullets").innerHTML = "";
    for (let i = 0; i < l; i++) {

        let newbullet = document.createElement("span");
        newbullet.className = "bullet";
        document.querySelector(".bullets").appendChild(newbullet);
        newbullet.id = i;
        if (i == 0) {
            newbullet.classList.add("select");
        }
    }

}


function checkbullet(ind) {
    let bull = document.querySelectorAll(".bullet")

    for (let i = 0; i < ind; i++) {
        bull[i].classList.add("select");

    }

}
document.querySelector("button").addEventListener("click", function () {
    event.preventDefault();
    document.querySelectorAll(".answer input").forEach(function (ele) {
        if (ele.checked) {

            if (ele.dataset.answer == ele.value) {
                right++;

            }
            index++;
            if (index <= 8) {
                loadDoc();

            }
            else {
                final();
            }

        }
    })
});
function final() {
    document.querySelector(".answer").remove();
    document.querySelector(".quistion").remove();
    document.querySelector(".bullets").remove();
    document.querySelector("button").remove();

}
counttime(180);
function counttime(seconds) {
    let countinterval = setInterval(() => {
        document.querySelector(".minute").innerHTML = Math.floor(seconds / 60);
        document.querySelector(".second").innerHTML = (seconds % 60).toFixed(0);

        if (index == 9) {
       
            clearInterval(countinterval);
            document.querySelector(".time").remove();
            document.querySelector("footer").remove();
        }
        if (seconds == 0) {
            clearInterval(countinterval);
            document.querySelector(".time").remove();
            document.querySelector("p").classList.add("finalresult");
            document.querySelector("footer").remove();
            
        }
        
        seconds--;


    }, 1000);

}