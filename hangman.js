function randint(low, high) {
    return Math.round((Math.random() * (high-low))+low)
}
function choice(li) {
    return li[randint(0,li.length-1)];
}
String.prototype.replaceAt = function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
String.prototype.uniqueChars = function(){//returns the amount of unique characters in a string
    strlist=this.split("")
    chars=[]
    for (x in strlist){
        if (!(strlist[x] in chars)){
            chars.push(strlist[x])
        }
    } //for each unique character, adds it to the chars array
    return chars.length
}
var chosenword="";
var incompleteword="";
var lives=9;
function getword(){
    document.getElementById("start").hidden=true
    document.getElementById("wordinput").hidden=false
    document.getElementById("wordsubmit").hidden=false
    //gets da input from the DOM
}
function startgame(){
    document.getElementById("wordinput").hidden=true
    document.getElementById("wordsubmit").hidden=true
    chosenword=document.getElementById("wordinput").value
    document.getElementById("keyboard").hidden=false
    document.getElementById("hangman").hidden=false
    alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    splitword=chosenword.split("")
    removespace=false
    try{
        for (x in splitword){
            if (!(alphabet.includes(splitword[x].toLowerCase()))){
                chosenword=chosenword.replace(splitword[x],"")
                removespace=true
            }
            //removes non-alphabet characters because that's cheating and cheaters are bad
            //though you can still just put in a single letter and they probably lose
        }
    } catch (err){
        alert(err.message)
    } //lol imagine using alerts, couldn't possibly be me a week ago
    incompleteword="_".repeat(chosenword.length)
    document.getElementById("word").innerHTML=incompleteword
}

function buttonpress(ele){//i am pretty sure this is the function to guess a letter
    try{
        ele.onclick=function() {}
        ele.className="inactive"
        if (chosenword.includes(ele.innerHTML.toLowerCase())){
            for (x in chosenword){
                if (chosenword[x]==ele.innerHTML.toLowerCase()){
                    incompleteword=incompleteword.replaceAt(x,chosenword[x])
                }
            }
            //replaces the blank stuff with the letter you guessed
            document.getElementById("word").innerHTML=incompleteword
            //updates the word
            if (incompleteword==chosenword){
                document.getElementById("keyboard").hidden=true
                document.getElementById("win").hidden=false
            }
            //win condition
        } else {
            lives-=1
            document.getElementById("hangman").src=""+(9-lives)+".png"
            if (lives==0){
                document.getElementById("keyboard").hidden=true
                document.getElementById("lose").hidden=false
                document.getElementById("lose").innerHTML=document.getElementById("lose").innerHTML+". The word was '"+chosenword+"'"
            }
            //haha owned you lost idiot
        }
    } catch (err){
        alert(err.message)
    }
}
