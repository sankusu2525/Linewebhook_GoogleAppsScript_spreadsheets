function doPost(e) {

//////////////////////
  var postData_ =e.postData.contents;
  var json = JSON.parse(postData_);
  var sheetId = "1E8N_KqzNSRLAcnYXTXIqASmhy8a2-XXXXXXXXXXXX";
  var sheet = SpreadsheetApp.openById(sheetId);
  sheet.appendRow([
    new Date(),
    json.destination,
    json.events[0].replyToken,
    json.events[0].type,
    json.events[0].mode,
    json.events[0].timestamp,
    json.events[0].source.type,
    json.events[0].source.userId,
    json.events[0].message.id,
    json.events[0].message.type,
    json.events[0].message.text,
  ]);
//////////////////////
//  var replyToken= JSON.parse(e.postData.contents).events[0].replyToken;
  var replyToken= json.events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }
  var url = 'https://api.line.me/v2/bot/message/reply';
  var channelToken = 'ZQ/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2Oie/ZHGa1Rj+LCUAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGLjV0zmpfBzk3KRvUdpxYo5GAcMhUMYjzYv5sTvm4cQXXXXXXXXXXXXXXXXXXXXXilFU=';

  var messages = [{
    'type': 'text',
    'text': postData_,
  }];

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
