/*
 * Copyright (c) 2009 Fabien Arcellier
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * */
 
/**
 * Root package of the add-on
 *
 */
var gatherTheSenders = {

  /**
   * Select every messages where the sender is common with a sender from
   * messages selected by the user
   * 
   */
  selectAllMsgFromSameSenders: function ()
  {    
    var aSenderEmails = [];
    var aMsgHeaderToSelect = [];
    var countMsgSelected = this.dbView.selection.getSelectionIndices().length;
    var msgIndiceInView = 0;
    var senderEmail = "";  
    // Traversing the message selected and extract sender mail adress of
    // selected messages
    for(indice = 0; indice < countMsgSelected; indice++)
    {
      msgIndiceInView = this.dbView.selection.getSelectionIndices()[indice];
      senderEmail = this.dbView.getMsgSenderForIndice(msgIndiceInView);
      gatherTheSenders.debug.dump( 
        "selectAllMsgFromSameSenders : email selected " + senderEmail);
      
      if(this.functions.inArray(aSenderEmails, senderEmail) === false) {
        aSenderEmails.push(senderEmail);
      }
      
    }
    
    gatherTheSenders.debug.dump( 
      "selectAllMsgFromSameSenders : Count of messages selected :" + 
      countMsgSelected );
    
    gatherTheSenders.debug.dump( 
      "selectAllMsgFromSameSenders : emails selected :" +
      aSenderEmails );
    
    var totalMsg = this.dbView.getTotalMessages();
    gatherTheSenders.debug.dump( 
      "selectAllMsgFromSameSenders : Count of messages in db :" +
      totalMsg );
    
    // For each message in the view, code compare the sender with the array of 
    // senders it created in the previous statement.
    // If the message's sender is in the array, the script add the message's 
    // header to an array
    for(indice = 0; indice < totalMsg; indice++)
    {
      try 
      {        
        senderEmail = this.dbView.getMsgSenderForIndice(indice);
        if(this.functions.inArray( aSenderEmails, senderEmail ) === true)
        {
          aMsgHeaderToSelect.push(this.dbView.getMsgHdrForIndice(indice));
          gatherTheSenders.debug.dump( 
            "selectAllMsgFromSameSenders : message's indice in the view pushed in the selection :" +
            indice );
            
        }
        
      } 
      catch(ex) 
      {
        gatherTheSenders.debug.dump( 
          "selectAllMsgFromSameSenders : Exception during selection process" +
          ex + ", index " + indice + ", email " + senderEmail );
      }
      
    }
    
    this.dbView.selection.selectMessagesForHeaders(aMsgHeaderToSelect);
    gatherTheSenders.debug.dump(
      "selectAllMsgFromSameSenders : Keys in the db of messages selected :" +
      aMsgHeaderToSelect );
      
  },//end selectAllMsgFromSameSenders()
  
  /**
   * Select all the messages in the current directory where recipients of messages
   * are equals to recipients of messages selected.
   *
   * @param boolean useCC If useCC = true, we take care about recipients in CC
   */
  selectAllMsgFromSameRecipients: function (useCC)
  {
    if(typeof useCC === undefined)
    {
      useCC = true;
    }
    
    var aRecipientsEmails = [];
    var aMsgHeaderToSelect = [];
    var countMsgSelected = this.dbView.selection.getSelectionIndices().length;
    var i = 0;
    var indice = 0;
    var msgKey = 0;
    var msgIndiceInView = 0;
    var aSplitRecipientsEmail = [];
    var recipientsEmail = [];    
    // Traversing the message selected and extract sender mail adress of
    // selected messages
    for(indice = 0; indice < countMsgSelected; indice++)
    {
      msgIndiceInView = this.dbView.selection.getSelectionIndices()[indice];
      recipientsEmail = this.dbView.getMsgRecipientsForIndice(msgIndiceInView);
      
      aSplitRecipientsEmail = recipientsEmail.split(",");
      gatherTheSenders.debug.dump( 
        "selectAllMsgFromSameRecipients : email selected " +
        recipientsEmail );
      
      for(j = 0, l = aSplitRecipientsEmail.length; j < l; j++)
      {
        if(this.functions.inArray(aRecipientsEmails, aSplitRecipientsEmail[j]) === false) {
          aRecipientsEmails.push(aSplitRecipientsEmail[j]);
        }
        
      }
      
    }
    
    gatherTheSenders.debug.dump( 
      "selectAllMsgFromSameRecipients : Count of messages selected :" +
      countMsgSelected );
    
    gatherTheSenders.debug.dump( 
      "selectAllMsgFromSameRecipients : emails selected :" +
      aRecipientsEmails );
      
    var totalMsg = this.dbView.getTotalMessages();
    gatherTheSenders.debug.dump( 
      "selectAllMsgFromSameRecipients : Count of messages in db :" +
      totalMsg );
    
    // For each message in the view, code compare the sender with the array of 
    // senders it created in the previous statement.
    // If the message's sender is in the array, the script add the message's 
    // header to an array
    for(indice = 0; indice < totalMsg; indice++)
    {
      try 
      {
        msgKey = this.dbView.getMsgKeyForIndice(indice);     
        recipientsEmail = this.dbView.getMsgRecipientsForIndice(indice);
        aSplitRecipientsEmail = recipientsEmail.split(",");
        
        for(j = 0, l = aSplitRecipientsEmail.length; j < l; j++)
        {
          if(this.functions.inArray( aRecipientsEmails, aSplitRecipientsEmail[j] ) === true)
          {
            aMsgHeaderToSelect.push(this.dbView.getMsgHdrForIndice(indice));
            gatherTheSenders.debug.dump( 
              "selectAllMsgFromSameRecipients : message's indice in the view pushed in the selection :" +
              indice );
            break;
          }
          
        } 
        
      } 
      catch(ex) 
      {
        gatherTheSenders.debug.dump( 
          "selectAllMsgFromSameRecipients : Exception during selection process" +
          ex + ", index " + indice + ", emails " + recipientsEmail );
        
      }
      
    }
    
    this.dbView.selection.selectMessagesForHeaders(aMsgHeaderToSelect);
    gatherTheSenders.debug.dump(
      "selectAllMsgFromSameRecipients : Keys in the db of messages selected :" +
      aMsgHeaderToSelect );
    
  }//end selectAllMsgFromSameRecipients()
  
};//end gatherTheSenders{}
 
gatherTheSenders.functions = {


  /**
   * Verify if a value exist in an array
   *
   * @return bool return true if the value is in the array
   * @link http://www.ab-d.fr/date/2007-10-14
   */
  inArray: function(array, p_val)
  {
    for(var i = 0, l = array.length; i < l; i++) 
    {
      if(array[i] == p_val) 
      {
        return true;
      }
      
    }
    
    return false;
  }//end inArray()
  
};//end gatherTheSenders.functions{}

 /**
  * Debug methods. On the production environment methods of this package are
  * unactives.
  *
  */
gatherTheSenders.debug = {

  /**
   * If debug member is set at true, this extension is in debug mode.
   *
   * When the debug mode is active, Exceptions and error messages are logged in
   * Thunderbird console.
   * It also logs execution messages trigged at key steps and some assertions
   * to verify the result in conform to the logic we have specified.
   **/
  debug: {$DEBUG},
  
  /**
   * Get console service from Thunderbird
   * 
   **/
  getConsole: function()
  {
    var consoleServiceComponent = Components.classes["@mozilla.org/consoleservice;1"];
    return consoleServiceComponent.getService(Components.interfaces.nsIConsoleService);
  },
  
  /**
   * Display a message on the console when debug mode is active
   *
   * @param aMessage array Messages to display
   */
  dump: function(aMessage)
  {
    if(this.debug === true)
    {
      var consoleService = this.getConsole();
      consoleService.logStringMessage("Gather Senders : " + aMessage);
    }
    
  },//end dump()
  
  /**
   * Assert expression. If expression return true, a message is displayed in
   * Thunderbird console.
   * This function is only active when debug mode is turn to (debug member = true)
   *
   */
  assert: function(exp, message)
  {
    if(this.debug === true && exp === true)
    {
      var consoleService = this.getConsole();
      consoleService.logStringMessage("Gather Senders : " + message);
    }
    
  }//end assert()
  
};//end gatherTheSenders.debug{}

/**
 * Parser to analyse the header of Messages
 * It's a service of Thunderbird.
 *
 */
gatherTheSenders.headerParser = Components.
  classes["@mozilla.org/messenger/headerparser;1"].
  getService(Components.interfaces.nsIMsgHeaderParser);

/**
 * It contains methods do work with messages dbView of Thunderbird
 *
 */
gatherTheSenders.dbView = {

  /**
   * Gets message header by using message key
   *
   * @param key int message key
   */
  getMsgHdrForKey: function(key)
  {
    return gDBView.db.GetMsgHdrForKey(key);
  },//end getMsgHdrForKey()
  
  /**
   * Gets message header by using message indice
   *
   * @param key int message key
   */
  getMsgHdrForIndice: function(indice)
  {
    return gDBView.getMsgHdrAt(indice);
  },//end getMsgHdrForIndice()

  /**
   * Gets the message key from the message view indice
   *
   * @param indice int message indice in view
   */
  getMsgKeyForIndice: function(indice)
  {
    return gDBView.getKeyAt(indice);
  },//end getMsgKeyForIndice()
  
  /**
   * Gets the message sender for the message key
   *
   * @param int message key in database
   */
  getMsgSenderForKey: function(key)
  {
    var msgHdr = this.getMsgHdrForKey(key);
    return gatherTheSenders.headerParser.
      extractHeaderAddressMailboxes(msgHdr.author);
  },//end getMsgSenderForKey()
  
  /**
   * Gets the message sender for the message indice
   *
   * @param int message indice in dbview
   */
  getMsgSenderForIndice: function(indice)
  {
    var msgHdr = this.getMsgHdrForIndice(indice);
    return gatherTheSenders.headerParser.
      extractHeaderAddressMailboxes(msgHdr.author);
  },//end getMsgSenderForKey()
  
  /**
   * Gets the message recipients for the message key
   *
   */
  getMsgRecipientsForKey: function(key)
  {
    var msgHdr = this.getMsgHdrForKey(key);
    return gatherTheSenders.headerParser.
      extractHeaderAddressMailboxes(msgHdr.recipients);
  },
  
  /**
   * Gets the message recipients for the message indice
   *
   */
  getMsgRecipientsForIndice: function(indice)
  {
    var msgHdr = this.getMsgHdrForIndice(indice);
    return gatherTheSenders.headerParser.
      extractHeaderAddressMailboxes(msgHdr.recipients);
  },
  
  /**
   * Gets the count of messages in the current message folder
   *
   * @return integer count of messages in the working folder.
   */
  getTotalMessages: function()
  {
    return gDBView.msgFolder.getTotalMessages(true);
  }//end getTotalMessages()
  
};//end gatherTheSenders.dbView{}

/**
 * Methods to work with selection in the working view
 *
 */
gatherTheSenders.dbView.selection = {

  /**
   * Gets an array(int) 1D which contains indices of message selected 
   * in the current view
   
   * @return array(int) Indices of messages selected
   */
  getSelectionIndices: function()
  {
    return gFolderDisplay.selectedIndices;
  },//end getSelectionIndices()
    
  /**
   * Selects mails by using header as a criteria
   *
   * @param aHeaders array headers arrays
   */
  selectMessagesForHeaders: function(aHeaders)
  {
    gFolderDisplay.selectMessages(aHeaders);
  }//end selectMessagesForHeaders()
 
};//end gatherTheSenders.dbView.selection{}