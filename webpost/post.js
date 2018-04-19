var deals = new Firebase('https://theredbrickinn-f566b.firebaseio.com/deals');

function getData(){
  var deal = document.getElementById("deal").value.trim();
  console.log(deal);
  saveToFB(deal);
};

function saveToFB(dealString){
  deals.push({
      deal: dealString,
      timestamp: Date.now()
  });
  document.getElementById("push").innerHTML = "Deal Posted: " + dealString;
};


function del(){
  if(confirm("Are you sure?")){
    deals.remove();
    document.getElementById("del").innerHTML = "Database Deleted";
  }
}
