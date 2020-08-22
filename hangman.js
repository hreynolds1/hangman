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
String.prototype.uniqueChars = function(){
    strlist=this.split("")
    chars=[]
    for (x in strlist){
        if (!(strlist[x] in chars)){
            chars.push(strlist[x])
        }
    }
    return chars.length
}
console.log("abcdefg".uniqueChars())
var chosenword="";
var incompleteword="";
var lives=9;
function getword(){
    document.getElementById("start").hidden=true
    document.getElementById("wordinput").hidden=false
    document.getElementById("wordsubmit").hidden=false
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
        }
    } catch (err){
        alert(err.message)
    }
    incompleteword="_".repeat(chosenword.length)
    document.getElementById("word").innerHTML=incompleteword
    alert(chosenword)
}

function buttonpress(ele){
    try{
        ele.onclick=function() {}
        ele.className="inactive"
        if (chosenword.includes(ele.innerHTML.toLowerCase())){
            for (x in chosenword){
                if (chosenword[x]==ele.innerHTML.toLowerCase()){
                    incompleteword=incompleteword.replaceAt(x,chosenword[x])
                }
            }
            document.getElementById("word").innerHTML=incompleteword
            if (incompleteword==chosenword){
                document.getElementById("keyboard").hidden=true
                document.getElementById("win").hidden=false
            }
        } else {
            lives-=1
            document.getElementById("hangman").src=""+(9-lives)+".png"
            if (lives==0){
                document.getElementById("keyboard").hidden=true
                document.getElementById("lose").hidden=false
                document.getElementById("lose").innerHTML=document.getElementById("lose").innerHTML+". The word was '"+chosenword+"'"
            }
        }
    } catch (err){
        alert(err.message)
    }
}