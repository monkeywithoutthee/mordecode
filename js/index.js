
//m00m m m0 0m0m m /m00m m m0 0m0m m /m00m m m0 0m0m m /m00m m m0 0m0m m /m00m m m0 0m0m m
////m00m m m0 0m0m m /m00m m m0 0m0m m /m00m m m0 0m0m m /m00m m m0 0m0m m /m00m m m0 0m0m m

/*
  hi, a simple page showing usage of javascript and the javascript object.
  On input, the string of data typed in gets translated to morse code or morse code gets translated to text.
  Simple questions for JavaScript!
  Just double click index.html and open in your standard web browser - should work an all!
  I am using onsen UI https://onsen.io/. I like it, it helps with styling and isnt obtrusive and real
  easy to override styling into whats required.
*/


  'use strict';
  //morse code page stuff!
  const dataset = [
  {char:"0",res: "-----"}
  ,{char:"1",res: ".----"}
  ,{char:"2",res: "..---"}
  ,{char:"3",res: "...--"}
  ,{char:"4",res: "....-"}
  ,{char:"5",res: "....."}
  ,{char:"6",res: "-...."}
  ,{char:"7",res: "--..."}
  ,{char:"8",res: "---.."}
  ,{char:"9",res: "----."}
  ,{char:"a",res: ".-"}
  ,{char:"b",res: "-..."}
  ,{char:"c",res: "-.-."}
  ,{char:"d",res: "-.."}
  ,{char:"e",res: "."}
  ,{char:"f",res: "..-."}
  ,{char:"g",res: "--."}
  ,{char:"h",res: "...."}
  ,{char:"i",res: ".."}
  ,{char:"j",res: ".---"}
  ,{char:"k",res: "-.-"}
  ,{char:"l",res: ".-.."}
  ,{char:"m",res: "--"}
  ,{char:"n",res: "-."}
  ,{char:"o",res: "---"}
  ,{char:"p",res: ".--."}
  ,{char:"q",res: "--.-"}
  ,{char:"r",res: ".-."}
  ,{char:"s",res: "..."}
  ,{char:"t",res: "-"}
  ,{char:"u",res: "..-"}
  ,{char:"v",res: "...-"}
  ,{char:"w",res: ".--"}
  ,{char:"x",res: "-..-"}
  ,{char:"y",res: "-.--"}
  ,{char:"z",res: "--.."}
  ,{char:".",res: ".-.-.-"}
  ,{char:",",res: "--..--"}
  ,{char:"?",res: "..--.."}
  ,{char:"!",res: "-.-.--"}
  ,{char:"-",res: "-....-"}
  ,{char:"/",res: "-..-."}
  ,{char:"@",res: ".--.-."}
  ,{char:"(",res: "-.--."}
  ,{char:")",res: "-.--.-"}
  ,{char:" ",res: "/"}
  ];
  const oMC = {toMorse:true,innerHTML:['morse to text','text to morse'],tenQuotes:[],favMorse:[]};

  const morse = function(){
    const morseclear = document.querySelector('.clearInputText');
    if (!morseclear.getAttribute('listener')){
        morseclear.addEventListener('click',(event)=>{
          //console.log(morseSwitchInput,'<<in morseSwitchInput click::',event);
          const morseTextInput = document.querySelector('.morseTextInput');
          morseTextInput && (morseTextInput.value = '');
          const morseOutput = document.querySelector('.morseOutput');
          morseOutput && (morseOutput.innerHTML = '');
          },true);
          morseclear.setAttribute('listener',true);
    };//ends morse clear

      const morseSwitchInput = document.querySelector('.morseSwitchInput');
        if (!morseSwitchInput.getAttribute('listener')){
            morseSwitchInput.addEventListener('click',(event)=>{
              const elTar = event.target;
              var sText = document.querySelector('.morseTextInput').value;
              if(oMC.toMorse){//was morse to text, so switch!
                  oMC.toMorse=false;elTar.innerHTML=oMC.innerHTML[0];
                  document.querySelector('.morseTextInput').value = document.querySelector('.morseOutput').innerText;
                  document.querySelector('.morseTextInput').placeholder = '- -.-- .--. . / ... --- -- . - .... .. -. --. / .. -. -.-.-- -.-.--';
                  addEvent();//fakes an input and runs the string conversion function!
              }else{
                  sText = document.querySelector('.morseOutput').innerText;
                  oMC.toMorse=true;elTar.innerHTML=oMC.innerHTML[1];
                  document.querySelector('.morseTextInput').value = sText;
                  document.querySelector('.morseTextInput').placeholder = 'type something in!!';
                  addEvent();//fakes an input and runs the string conversion function!
              };
            },true);
            morseSwitchInput.setAttribute('listener',true);
      };//ends morseSwitchInput


        const morseTextInput = document.querySelector('.morseTextInput');
        if (!morseTextInput.getAttribute('listener')){
            morseTextInput.addEventListener('input', function (event) {
              const elTar = event.target;
              //	console.log(oMC.toMorse,'<<in morseTextInput::',elTar.className);
                var inputValue = elTar.value.split("");
                var sspace = " ";
                if (!oMC.toMorse){inputValue = elTar.value.split(" ");sspace="";}

                var outputString = new Promise(function(resolve,reject){
                var output = '';
                inputValue.forEach((item) => {
          //  console.log(item,item.charCodeAt(),'<<inputValue::',returnNewValue({morse:oMC.toMorse,item:item}));
            //….-  …

                  output += sspace + returnNewValue({morse:oMC.toMorse,item:removeSC(item)});
                });
                resolve(output);
                reject(false);
              });
              outputString.then((data)=>{
                //console.log(inputValue,'<<<in INPUT change!!!event::', event.target.value,data);
                document.querySelector('.morseOutput').innerHTML = data;
                return;
              });
            }, false);
            morseTextInput.setAttribute('listener',true);
      };



      const copyMorse = document.querySelector('.copyMorse');
      if (!copyMorse.getAttribute('listener')){
          copyMorse.addEventListener('click', function(event){
            //console.log(navigator,'<<in  copytoMorse;;',event.target.innerText);
            const copytext = event.target.innerText;
             // Copy the text inside the text field
            navigator.clipboard.writeText(copytext);
            toastSuccess("Copied to clipboard!");
            return;
          });
          copyMorse.setAttribute('listener',true);
      };


      const quotesLink = document.querySelector('.quotesLink')
        if (!quotesLink.getAttribute('listener')){
          quotesLink.addEventListener('click',function(){
            //console.log('in get quotes link');
            new Promise((resolve,reject)=>{
              resolve(fetchTenQuotes());
              reject(false);
            })
            .then((data)=>{
            //  console.log('fetchTenQuotes returns::',data);
              oMC.tenQuotes = data;
              drawTenQuotes();
            })
            .catch((error)=>{
              console.log('fetchTenQuotes error::',error);
            })
          });
          quotesLink.setAttribute('listener',true);
        }


        const quotesheader = document.querySelector('.quotesheader');
        if (!quotesheader.getAttribute('listener')){
          quotesheader.addEventListener('click',function(event){
          //console.log('quotesheader::',event);
          event.preventDefault();
            const el = document.querySelector('.quotesContainingHolder');
            const el2 = document.querySelector('.quotesLink');
            if (el){
              //if (el.style.display === 'none'){
              if (el.classList.contains('elHide')){
                $(quotesheader).removeClass('quotesclosed');
                $(el).slideDown('slow',function(){
                //  $(this).removeAttr('style');
                  $(this).removeClass('elHide');
                  $(this).addClass('elShow');

                });
                $(el2).fadeIn('slow',function(){
                //  $(this).removeAttr('style');
                  $(this).removeClass('elHide');
                  $(this).addClass('elShowi');
                });
              }else{
                $(el).slideUp('slow',function(){
                //  $(this).removeAttr('style');
                  $(this).removeClass('elShow');
                  $(this).addClass('elHide');
                  $(quotesheader).addClass('quotesclosed');
                });
                $(el2).fadeOut('slow',function(){
                //  $(this).removeAttr('style');
                  $(this).removeClass('elShowi');
                  $(this).addClass('elHide');
                  $(quotesheader).addClass('quotesclosed');
                });
              };
            }
        },true);
        quotesheader.setAttribute('listener',true);
      };
      new Promise((resolve,reject)=>{
        resolve(fetchTenQuotes());
        reject(false);
      })
      .then((data)=>{
        //console.log('fetchTenQuotes returns::',data);
        oMC.tenQuotes = data;
        drawTenQuotes();
      })
      .catch((error)=>{
        console.log('fetchTenQuotes error::',error);
      });
      return;
  };

  const fetchTenQuotes = function(){
      //console.log('in getTenQuotes;');
      //this is my personal quotes API. Use it, dont abuse it!
      const path = 'https://apiapi.monkeywithoutthee.com/getTenQuotes/58/'
        return window.fetch(path, {
        method: 'GET',
        headers: {'Accept': 'application/json','Content-Type': 'application/json','monkey':'1nth3suMMerth4su4alw4ys5hin3s'
        }
      })
    .then(response => response.json())
    .then(data => {
        //console.log('fetch getTenQuotes RETURN::', data);
        //[{id:"",title:'',body:'',score:0}]
        return data;
     })
     .catch(error => {
      //  toastSuccess("There was an error!");
        console.log("error::;", error);
        ons.notification.alert({message:error});
        return false;
     })
  };
  const drawTenQuotes = (()=>{
    //  console.log('drawTenQuotes IN::');
      const data = oMC.tenQuotes;
      //draw loop, truncate
      //sHTML
      var sHTML = '';
      for (var i = 0; i < data.length; i++) {
        sHTML += `<div class='quotesList'><span class='quotesListChild'>${data[i].quoteAuthor + '::' + data[i].quoteText.slice(0,15)+'...'}</span></div>`;
      };
      var o = document.querySelector('.quotesContaining');
      o.innerHTML = sHTML;
      setTimeout(()=>{
        o = document.querySelector('.quotesContainingHolder');
        $(o).slideDown('slow',function(){
          $(this).removeAttr('style');
          $(this).removeClass('elHide');
          $(this).addClass('elShow');
        });
        addTenQuoteListeners('quotesList');
      },200);
      return;

  })
  const addTenQuoteListeners = ((data)=>{
    //the tenQuote listeners
    const gp = document.querySelector('.quotesContaining');
    const o = document.querySelectorAll('.'+data);
    o.forEach((item, i) => {

        if (!item.getAttribute('listener')){
            item.addEventListener('click', function(event){
            //  var gp = document.querySelector('.quotesContaining');
            var evTarget = event.target;
            if (evTarget.className === 'quotesListChild'){
              evTarget = event.target.parentElement;
            };
              oMC.toMorse = true;
              var iClicked = Array.prototype.indexOf.call(gp.childNodes,evTarget);

              document.querySelector('.morseSwitchInput').innerHTML = oMC.innerHTML[1];
              makequoteMorse(iClicked);
            //  console.log(iClicked,m.getLength(),'<<quotesList clicked::',event.target,m);
          });
          item.setAttribute('listener',true);
        }
    });
    //return;
  });
  const makequoteMorse = function(data){
      //draw out quote as text
      document.querySelector('.morseTextInput').value = oMC.tenQuotes[data].quoteText + ' \n' + oMC.tenQuotes[data].quoteAuthor;
      const x = addEvent();
  };
  const addEvent = function(){
      //this "fakes" an input event
      var event = document.createEvent('Event');
      event.initEvent('input', true, true);
        //  console.log(event.initEvent('input', true, true),'<<addEvent::',document.querySelector('.morseTextInput').dispatchEvent(event));
      return document.querySelector('.morseTextInput').dispatchEvent(event);
  };


   const returnNewValue = ((data)=>{
     var returnValue = '';
     for (var i = 0; i < dataset.length; i++) {
       if (data.morse&&dataset[i].char.toLowerCase()===data.item.toLowerCase()){
         returnValue = dataset[i].res;
         break;
       };
       if (!data.morse&&dataset[i].res.toLowerCase()===data.item.toLowerCase()){
         //console.log(data.morse,' morse to text::',dataset[i].res,data.item)
         returnValue = dataset[i].char;
         break;
       };
     };
    //console.log(returnValue,'<<returnNewValue::',data);
     return returnValue;
   });

  const removeSC = ((data)=>{
    //item.replaceAll('—','--').replaceAll('…','...') -
    //this is used because mac os replaces them as they look nicer on the screen.
    //Need placing back! ANy other that turn up can be added here!
    //console.log('removeSC::',data)
    var returndata = data;//android and desktop
  /*  if (!oPage.islocal&&device.platform.toLowerCase()==='ios'){
      //returndata = data.replaceAll('—','--').replaceAll('…','...');//IOS
      returndata = data.replace(/\—/g,'--').replace(/\…/g,'...');
    };*/
    return returndata;
  });


  const toastSuccess = ((text)=>{
      ons.notification.toast(text,{timeout:4000,animation:'fall'}); // Shows from 0s to 2s
  });

  const innit = (()=>{
    morse();
  });


  window.load = innit();//when the page is loaded, do something!@!@
