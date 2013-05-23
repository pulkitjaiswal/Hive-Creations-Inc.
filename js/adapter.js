
/**
 * Function for getting stuff related to the profile
 * @param  {Function} callback Function to be called when all data has been retrieved from the server, should pass the profile and friends object
 */
function adapter_getProfileInfo(callback){
	//TODO
	/**
	 * Should get:
	 * Object containing, profileimage, profile name, profile location (more?)
	 * Object containing, friend images (more?)
	 */
}

/**
 * Function for getting the company images from the server.
 * Should pass them as an object into the callback function
 * @param  {Function} callback Function to be called when the info has been retrived
 */
function adapter_retrievUserFavoriteBrands(callback){

}

/**
 * Gets all the users conversations from the server.
 * Should return array of objects containing names and identyfier (conversation id?)
 * @param  {Function} callback Function to be called and passed the array of objects
 */
function adapter_getUserConversations(callback){

}

/**
 * Function for getting a specific converstion
 * Should return the following from the server:
 * Names of the participants
 * Array of objects containing the chat object (Name of sender, Message, (timestamp?))
 * @param  {[int]}   conversationID identifier for the specific conversation
 * @param  {Function} callback Function to be called when conversation has been retrived
 */
function adapter_getUserConversation(conversationID, callback){

}

/**
 Sends a new chat message to the server
 * @param  {[String]} message The message
 * @param  {[int]} conversationID conversation id
 * (anything more that would be needed?)
 */
function adapter_sendChatMessage(message, conversationID){

}

/**
 * Function to be pulling (is this the best way to get new messages?) the server for new messages
 * @param  {Function} callback Function to be called when a message has been retrived
 */
function adapter_retrieveNewChatMessage(callback){

}

/**
 * Sends a newly composed message to the server
 * @param  {[id]} recipient   User to whom the message is for (how should the user be identified?)
 * @param  {[String]} messageText Message text
 */
function adapter_sendNewComposedMessage(recipient, messageText){

}

