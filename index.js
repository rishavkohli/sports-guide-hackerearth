// Lambda Function code for Alexa.
// Paste this into your index.js file. 

const Alexa = require("ask-sdk");
const https = require("https");



const invocationName = "sports guide";

// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

function getMemoryAttributes() {   const memoryAttributes = {
       "history":[],


       "launchCount":0,
       "lastUseTimestamp":0,

       "lastSpeechOutput":{},
       // "nextIntent":[]

       // "favoriteColor":"",
       // "name":"",
       // "namePronounce":"",
       // "email":"",
       // "mobileNumber":"",
       // "city":"",
       // "state":"",
       // "postcode":"",
       // "birthday":"",
       // "bookmark":0,
       // "wishlist":[],
   };
   return memoryAttributes;
};

const maxHistorySize = 20; // remember only latest 20 intents 


// 1. Intent Handlers =============================================

const AMAZON_FallbackIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let previousSpeech = getPreviousSpeechOutput(sessionAttributes);

        return responseBuilder
            .speak('Sorry I didnt catch what you said, ' + stripSpeak(previousSpeech.outputSpeech))
            .reprompt(stripSpeak(previousSpeech.reprompt))
            .getResponse();
    },
};

const AMAZON_CancelIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let history = sessionAttributes['history'];
        let intents = getCustomIntents();
        let sampleIntent = randomElement(intents);

        let say = 'hello' + ' and welcome to ' + invocationName + ' ,I will give you necessary details about your favourite game (choose from basketball, cricket, hockey and football)'; 

       
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StopIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_NavigateHomeIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.NavigateHomeIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};


const AWS = require('aws-sdk');


// Set the region
 
AWS.config.update({region: "us-east-1"});

const scanCoaching=function he(params){
     var docClient = new AWS.DynamoDB.DocumentClient();
     var data2='';
     return new Promise(function (resolve, reject){
   docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        data2=data2+JSON.stringify(err, null, 2);
        
    } else { var i=1;
        // print all the movies
        console.log("Scan succeeded.");
         console.log(data);
        data.Items.forEach(function(store) {
         console.log('this is store ');
           console.log(store);
          
           if(i==1)
           data2=data2+','+'First'+',';
           
           if(i==2)
           data2=data2+','+'second'+',';
           
           if(i==3)
           data2=data2+','+'Third'+',';
           
           if(i==4)
           data2=data2+','+'Forth'+',';
           
           if(i==5)
           data2=data2+','+'Fifth'+',';
          
           data2=data2+store.coaching_academy;
           i++;
        });
        console.log('retrived data');
        console.log(data2);

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
        
        resolve(data2);
    }
}


})
    
};



const scanEquipment=function he(params){
     var docClient = new AWS.DynamoDB.DocumentClient();
     var data2='';
     return new Promise(function (resolve, reject){
   docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        data2=data2+JSON.stringify(err, null, 2);
        
    } else { var i=1;
        // print all the movies
        console.log("Scan succeeded.");
         console.log(data);
        data.Items.forEach(function(store) {
         console.log('this is store ');
           console.log(store);
           if(i==1)
           data2=data2+','+'First'+',';
           
           if(i==2)
           data2=data2+','+'second'+',';
           
           if(i==3)
           data2=data2+','+'Third'+',';
           
           if(i==4)
           data2=data2+','+'Forth'+',';
           
           if(i==5)
           data2=data2+','+'Fifth'+',';
           
           data2=data2+store.equipment_store;
           i++;
        });
        console.log('retrived data');
        console.log(data2);

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
        
        resolve(data2);
    }
}


})
    
};

const getEquipmentStore = function he(request){
   
   console.log('hello from geteqipmentstote');
   console.log(game);
   console.log('is game type');
    var data1='';
     console.log(loca);
      return new Promise(function (resolve, reject){
   

    console.log('hello from get Description');
    var params = {
    TableName: game,
    ProjectionExpression: "#loc,equipment_store",
    FilterExpression: "#loc=:letter",
    ExpressionAttributeNames: {
        "#loc": "loc",
    },
    ExpressionAttributeValues: {
         ":letter": loca
    }
};


// Call DynamoDB to read the item from the table
scanEquipment(params).then(function (data2) {
    console.log('this is from geteqipmentstore');
      console.log(data2);
     data1=data1+data2;

    
    
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: games 
      // else {
      //      slotStatus += 'slot games is empty. ';
     //   }
        
     resolve(data1);
     
}




);

}
)};

const getCoachingAcademy = function he(request){
   
   console.log('hello from geteqipmentstote');
   console.log(game);
   console.log('is game type');
    var data1='';
     console.log(loca);
      return new Promise(function (resolve, reject){
   

    console.log('hello from get Description');
    var params = {
    TableName: game,
    ProjectionExpression: "#loc,coaching_academy",
    FilterExpression: "#loc=:letter",
    ExpressionAttributeNames: {
        "#loc": "loc",
    },
    ExpressionAttributeValues: {
         ":letter": loca
    }
};


// Call DynamoDB to read the item from the table
scanCoaching(params).then(function (data2) {
    console.log('this is from geteqipmentstore');
      console.log(data2);
     data1=data1+data2;

    
    
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: games 
      // else {
      //      slotStatus += 'slot games is empty. ';
     //   }
        
     resolve(data1);
     
}




);

}
)};

const getMyDataBro = function he(params) 
{
    
    // Create the DynamoDB service object
    
var ddb = new AWS.DynamoDB();

 
   
    return new Promise(function (resolve, reject) {
  
      
        ddb.getItem(params, function(err, data) {
  
        if (err) {
             
 console.log("Hey - Error",err);
       
     //  say='error';
       
   } else {
    
          console.log("Hey - Sucess and data is ");
 
             console.log(data);
          
      resolve(data);      
         
   
            //  say='hey';
       
   }
        })
    })
};


const getDecription=function he(game,request,data1){
      return new Promise(function (resolve, reject){
  
    console.log('hello from get Description');
    var params = {
  TableName:  game,
  Key: {
    'sno' : {N: '1'}
  },
  ProjectionExpression: "description"
};


// Call DynamoDB to read the item from the table
getMyDataBro(params).then(function (data) {
  
    console.log( data.Item);
    console.log('next item');
  data1=''+ data.Item.description.S;

    
    console.log('my data is...............');
       console.log(data1);
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: games 
      // else {
      //      slotStatus += 'slot games is empty. ';
     //   }
        
    
     resolve(data1); 
       }




);

    

    
})};
  var game='';
const details_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'details' ;
    },
    handle(handlerInput) {
            const request = handlerInput.requestEnvelope.request;
            const responseBuilder = handlerInput.responseBuilder;
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         let slotStatus = '';
            let resolvedSlot;
    var data1='';
            let slotValues = getSlotValues(request.intent.slots); 
     var slotval = request.intent.slots.games.value;
       game=slotval
    let say = '';

 //for(var i=1;i<=16;i++){
   //  var pointer=''+i
 
 return getDecription(slotval,request,data1).then(function (data1){
   console.log('hello from then')
   say=data1;
 if (slotValues.games.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.games.heardAs + '" to the custom slot type used by slot games! '); 
        }

        if( (slotValues.games.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.games.heardAs) ) {
           // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('details','games'), 'or');
        }

        say += slotStatus;
 console.log(say)
  
  }).then(function(){
      say=say+'    !!!'+"isn't it a quite interesting game ,"; 
      say=say+' Do you want the rules of '+slotval;
      return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
  
  }); 
  
        
    },
};
const yesRules_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'yesRules' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'rules of : ';
         
            console.log('yes from rules');
           console.log(game);
            say=say+game;
             var params = {
  TableName: game,
  Key: {
    'sno' : {N: '1'}
  },
  ProjectionExpression: "gameRule"
};
 return getMyDataBro(params).then(function (data) { 
       say=say+data.Item.gameRule.S;     
            
       }).then(function(){
      say=say+'    !!!'+"  oh..that's a long list of rules but believe me it's even more fun to play,  "; 
      say=say+' please tell me What is your location...(choose from delhi, mumbai,bangalore,kolkata)';
      return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse() });
            
        
            },
};

const noRules_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'noRules' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say ='oh..seems like you already know the rules of :'+ game  +  '  ,then please tell me ,What is your location...(choose from delhi, mumbai,bangalore,kolkata) ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};
var loca='';
const loc_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'loc' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
          var temp=request.intent.slots.location.value;
        
        if(temp=='Bangalore')
         { loca='Bengaluru';
         } else if(temp=='kolkata')
        {
            loca='Kolkata';
            
        } else
        {
            loca=temp;
            
        }
        let say = ' you live in ,'+loca+ ", that's a pretty city ,Do you want the list of coaching academy, from where you can find some guidance ,or, the list of equipment store near u from where you can buy quality items needed for :  "+game+" ,Please select one";  
        console.log('hello from location');
         console.log(game);
        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: location 
      
        
        if (slotValues.location.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.location.heardAs + '" to the custom slot type used by slot location! '); 
        }

        if( (slotValues.location.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.location.heardAs) ) {
           // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('loc','location'), 'or');
        }

        say += slotStatus;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const coachingAcademy_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'coachingAcademy' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Coaching academy near u are ';

  return getCoachingAcademy(request).then( function(data1){
         say=say+data1+',if u want equipment store from where you can buy quality items of'+ game +' ,please say equipment store else say stop';
           console.log('from intent my data is ');
           console.log(data1);
       }).then(function(){
           console.log('hello from say');
           console.log(say);
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();});
        
    },
};

const equipmentStore_Handler =  {
    
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'equipmentStore' ;
    },
    handle(handlerInput) {
       
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let data1='';
       
        let say ='equipment store near u are::::: ';
         
       
     
       
      
       return getEquipmentStore(request).then( function(data1){
         say=say+data1+',if u want coaching academy from where you can find proper guidance to play at competitive level , say coaching academy else say stop';
           console.log('from intent my data is ');
           console.log(data1);
       }).then(function(){
           console.log('hello from say');
           console.log(say);
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();});
    },
};

const LaunchRequest_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'hello' + ' and welcome to ' + invocationName + ' ,I will give you necessary details about your favourite game (choose from basketball, cricket, hockey and football)';

        let skillTitle = capitalize(invocationName);


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Welcome!', 
              'Hello!\nThis is a card for your skill, ' + skillTitle,
               welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    },
};

const SessionEndedHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler =  {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak(`Sorry, your skill got this error.  ${error.message} `)
            .reprompt(`Sorry, your skill got this error.  ${error.message} `)
            .getResponse();
    }
};


// 2. Constants ===========================================================================

    // Here you can define static data, to be used elsewhere in your code.  For example: 
    //    const myString = "Hello World";
    //    const myArray  = [ "orange", "grape", "strawberry" ];
    //    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}

 
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
 
function stripSpeak(str) { 
    return(str.replace('<speak>', '').replace('</speak>', '')); 
} 
 
 
 
 
function getSlotValues(filledSlots) { 
    const slotValues = {}; 
 
    Object.keys(filledSlots).forEach((item) => { 
        const name  = filledSlots[item].name; 
 
        if (filledSlots[item] && 
            filledSlots[item].resolutions && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
                case 'ER_SUCCESS_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
                        ERstatus: 'ER_SUCCESS_MATCH' 
                    }; 
                    break; 
                case 'ER_SUCCESS_NO_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: '', 
                        ERstatus: 'ER_SUCCESS_NO_MATCH' 
                    }; 
                    break; 
                default: 
                    break; 
            } 
        } else { 
            slotValues[name] = { 
                heardAs: filledSlots[item].value || '', // may be null 
                resolved: '', 
                ERstatus: '' 
            }; 
        } 
    }, this); 
 
    return slotValues; 
} 
 
function getExampleSlotValues(intentName, slotName) { 
 
    let examples = []; 
    let slotType = ''; 
    let slotValuesFull = []; 
 
    let intents = model.interactionModel.languageModel.intents; 
    for (let i = 0; i < intents.length; i++) { 
        if (intents[i].name == intentName) { 
            let slots = intents[i].slots; 
            for (let j = 0; j < slots.length; j++) { 
                if (slots[j].name === slotName) { 
                    slotType = slots[j].type; 
 
                } 
            } 
        } 
 
    } 
    let types = model.interactionModel.languageModel.types; 
    for (let i = 0; i < types.length; i++) { 
        if (types[i].name === slotType) { 
            slotValuesFull = types[i].values; 
        } 
    } 
 
    slotValuesFull = shuffleArray(slotValuesFull); 
 
    examples.push(slotValuesFull[0].name.value); 
    examples.push(slotValuesFull[1].name.value); 
    if (slotValuesFull.length > 2) { 
        examples.push(slotValuesFull[2].name.value); 
    } 
 
 
    return examples; 
} 
 
function sayArray(myData, penultimateWord = 'and') { 
    let result = ''; 
 
    myData.forEach(function(element, index, arr) { 
 
        if (index === 0) { 
            result = element; 
        } else if (index === myData.length - 1) { 
            result += ` ${penultimateWord} ${element}`; 
        } else { 
            result += `, ${element}`; 
        } 
    }); 
    return result; 
} 
function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay = 
        handlerInput.requestEnvelope.context && 
        handlerInput.requestEnvelope.context.System && 
        handlerInput.requestEnvelope.context.System.device && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display; 
 
    return hasDisplay; 
} 
 
 
const welcomeCardImg = { 
    smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png", 
    largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png" 
 
 
}; 
 
const DisplayImg1 = { 
    title: 'Jet Plane', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png' 
}; 
const DisplayImg2 = { 
    title: 'Starry Sky', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png' 
 
}; 
 
function getCustomIntents() { 
    const modelIntents = model.interactionModel.languageModel.intents; 
 
    let customIntents = []; 
 
 
    for (let i = 0; i < modelIntents.length; i++) { 
 
        if(modelIntents[i].name.substring(0,7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest" ) { 
            customIntents.push(modelIntents[i]); 
        } 
    } 
    return customIntents; 
} 
 
function getSampleUtterance(intent) { 
 
    return randomElement(intent.samples); 
 
} 
 
function getPreviousIntent(attrs) { 
 
    if (attrs.history && attrs.history.length > 1) { 
        return attrs.history[attrs.history.length - 2].IntentRequest; 
 
    } else { 
        return false; 
    } 
 
} 
 
function getPreviousSpeechOutput(attrs) { 
 
    if (attrs.lastSpeechOutput && attrs.history.length > 1) { 
        return attrs.lastSpeechOutput; 
 
    } else { 
        return false; 
    } 
 
} 
 
function timeDelta(t1, t2) { 
 
    const dt1 = new Date(t1); 
    const dt2 = new Date(t2); 
    const timeSpanMS = dt2.getTime() - dt1.getTime(); 
    const span = { 
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )), 
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)), 
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)), 
        "timeSpanDesc" : "" 
    }; 
 
 
    if (span.timeSpanHR < 2) { 
        span.timeSpanDesc = span.timeSpanMIN + " minutes"; 
    } else if (span.timeSpanDAY < 2) { 
        span.timeSpanDesc = span.timeSpanHR + " hours"; 
    } else { 
        span.timeSpanDesc = span.timeSpanDAY + " days"; 
    } 
 
 
    return span; 
 
} 
 
 
const InitMemoryAttributesInterceptor = { 
    process(handlerInput) { 
        let sessionAttributes = {}; 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            let memoryAttributes = getMemoryAttributes(); 
 
            if(Object.keys(sessionAttributes).length === 0) { 
 
                Object.keys(memoryAttributes).forEach(function(key) {  // initialize all attributes from global list 
 
                    sessionAttributes[key] = memoryAttributes[key]; 
 
                }); 
 
            } 
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
 
        } 
    } 
}; 
 
const RequestHistoryInterceptor = { 
    process(handlerInput) { 
 
        const thisRequest = handlerInput.requestEnvelope.request; 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
        let history = sessionAttributes['history'] || []; 
 
        let IntentRequest = {}; 
        if (thisRequest.type === 'IntentRequest' ) { 
 
            let slots = []; 
 
            IntentRequest = { 
                'IntentRequest' : thisRequest.intent.name 
            }; 
 
            if (thisRequest.intent.slots) { 
 
                for (let slot in thisRequest.intent.slots) { 
                    let slotObj = {}; 
                    slotObj[slot] = thisRequest.intent.slots[slot].value; 
                    slots.push(slotObj); 
                } 
 
                IntentRequest = { 
                    'IntentRequest' : thisRequest.intent.name, 
                    'slots' : slots 
                }; 
 
            } 
 
        } else { 
            IntentRequest = {'IntentRequest' : thisRequest.type}; 
        } 
        if(history.length > maxHistorySize - 1) { 
            history.shift(); 
        } 
        history.push(IntentRequest); 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
 
}; 
 
 
 
 
const RequestPersistenceInterceptor = { 
    process(handlerInput) { 
 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            return new Promise((resolve, reject) => { 
 
                handlerInput.attributesManager.getPersistentAttributes() 
 
                    .then((sessionAttributes) => { 
                        sessionAttributes = sessionAttributes || {}; 
 
 
                        sessionAttributes['launchCount'] += 1; 
 
                        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
                        handlerInput.attributesManager.savePersistentAttributes() 
                            .then(() => { 
                                resolve(); 
                            }) 
                            .catch((err) => { 
                                reject(err); 
                            }); 
                    }); 
 
            }); 
 
        } // end session['new'] 
    } 
}; 
 
 
const ResponseRecordSpeechOutputInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        let lastSpeechOutput = { 
            "outputSpeech":responseOutput.outputSpeech.ssml, 
            "reprompt":responseOutput.reprompt.outputSpeech.ssml 
        }; 
 
        sessionAttributes['lastSpeechOutput'] = lastSpeechOutput; 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
}; 
 
const ResponsePersistenceInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession); 
 
        if(ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 
 
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime(); 
 
            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes); 
 
            return new Promise((resolve, reject) => { 
                handlerInput.attributesManager.savePersistentAttributes() 
                    .then(() => { 
                        resolve(); 
                    }) 
                    .catch((err) => { 
                        reject(err); 
                    }); 
 
            }); 
 
        } 
 
    } 
}; 
 
 
function shuffleArray(array) {  // Fisher Yates shuffle! 
 
    let currentIndex = array.length, temporaryValue, randomIndex; 
 
    while (0 !== currentIndex) { 
 
        randomIndex = Math.floor(Math.random() * currentIndex); 
        currentIndex -= 1; 
 
        temporaryValue = array[currentIndex]; 
        array[currentIndex] = array[randomIndex]; 
        array[randomIndex] = temporaryValue; 
    } 
 
    return array; 
} 
// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_FallbackIntent_Handler, 
        AMAZON_CancelIntent_Handler, 
        AMAZON_HelpIntent_Handler, 
        AMAZON_StopIntent_Handler, 
        AMAZON_NavigateHomeIntent_Handler, 
        details_Handler, 
        yesRules_Handler, 
        noRules_Handler, 
        loc_Handler, 
        coachingAcademy_Handler, 
        equipmentStore_Handler, 
        LaunchRequest_Handler, 
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)

   // .addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)

 // .addRequestInterceptors(RequestPersistenceInterceptor)
 // .addResponseInterceptors(ResponsePersistenceInterceptor)

 // .withTableName("askMemorySkillTable")
 // .withAutoCreateTable(true)

    .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "sports guide",
      "intents": [
        {
          "name": "AMAZON.FallbackIntent",
          "samples": []
        },
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": ["hey",
                    "help"]
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NavigateHomeIntent",
          "samples": ["what"]
        },
        {
          "name": "details",
          "slots": [
            {
              "name": "games",
              "type": "games"
            }
          ],
          "samples": [
            "{games}"
          ]
        },
        {
          "name": "yesRules",
          "slots": [],
          "samples": [
            "yes tell me a rule",
            "yes give give rules",
            "give me rules",
            "yes tell me rules",
            "rules",
            "yes i want rules",
            "yes"
          ]
        },
        {
          "name": "noRules",
          "slots": [],
          "samples": [
            "nope",
            "no i don't want rules",
            "no"
          ]
        },
        {
          "name": "loc",
          "slots": [
            {
              "name": "location",
              "type": "location"
            }
          ],
          "samples": [
            "i live in {location}",
            "my location is {location}",
            "i choose {location}",
            "{location}"
          ]
        },
        {
          "name": "coachingAcademy",
          "slots": [],
          "samples": [
            "tell me a list of  coaching academy",
            "give me a list of coaching academy",
            "i choose coaching academy",
            "i choose list of coaching academy",
            "coaching academy"
          ]
        },
        {
          "name": "equipmentStore",
          "slots": [],
          "samples": [
            "i choose a list of equipment store",
            "list of equipment store",
            "give me a list of equipment store",
            "i choose equipment store",
            "equipment store"
          ]
        },
        {
          "name": "LaunchRequest"
        }
      ],
      "types": [
        {
          "name": "games",
          "values": [
            {
              "name": {
                "value": "Football",
                "synonyms": [
                  "football"
                ]
              }
            },
            {
              "name": {
                "value": "Cricket",
                "synonyms": [
                  "cricket"
                ]
              }
            },
            {
              "name": {
                "value": "Hockey",
                "synonyms": [
                  "hockey"
                ]
              }
            },
            {
              "name": {
                "value": "Basketball",
                "synonyms": [
                  "basketball"
                ]
              }
            }
          ]
        },
        {
          "name": "location",
          "values": [
            {
              "name": {
                "value": "Bengaluru",
                "synonyms": [
                  "bangalore",
                  "Bangalore",
                  "Bengaluru",
                  "bengaluru"
                ]
              }
            },
            {
              "name": {
                "value": "Kolkata",
                "synonyms": [
                  "Kolkata",
                  "kolkata"
                ]
              }
            },
            {
              "name": {
                "value": "Mumbai",
                "synonyms": [
                  "mumbai",
                  "Mumbai"
                ]
              }
            },
            {
              "name": {
                "value": "Delhi",
                "synonyms": [
                  "delhi"
                ]
              }
            }
          ]
        }
      ]
    }
  }
};
