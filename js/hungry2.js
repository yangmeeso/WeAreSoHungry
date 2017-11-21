// Initialize Firebase
var config = {
	apiKey: "AIzaSyApCZANinnru-gKDVNacC9nm35ynKKQGTs",
	authDomain: "we-re-so-hungry.firebaseapp.com",
	databaseURL: "https://we-re-so-hungry.firebaseio.com",
	projectId: "we-re-so-hungry",
	storageBucket: "we-re-so-hungry.appspot.com",
	messagingSenderId: "146172848851"
};
firebase.initializeApp(config);

//  Assign the reference to the database to a variable named 'database'
var database2 = firebase.database();




// Performs the Reciepe lookup
function edamamAPI(newIngredients){

	var applicationID = "ee864bfc";
	var receipeSearchAPIKey = "bd4299ab0500d03db078800ad8bbd068";
	var ingredientQuery = newIngredients;

	// Dynamicaly build the ingredientQuery by grabbing all ingredients
	// for(var key in newIngredients){
	// 	//  Add each ingredient to the query string
	// 	// The '%20' is for a space between each ingredient
	// 	ingredientQuery += newIngredients[key] + '%20';

	// }	

		console.log("New Ingredients are " + ingredientQuery);

		// Build queryURL for Ajax call
		var queryURL = 'https://api.edamam.com/search?q=' + ingredientQuery + '&app_id=' + applicationID + '&app_key=' + receipeSearchAPIKey;

		$.ajax({
			url:queryURL,
			method:"GET"
		})
		// after data returned
		.done(function(response){
			console.log(response);
			//shortcut for response.hits
			var results = response.hits

			for (let i = 0; i < results.length; i++) {

                    
                    //creating and sorting a div tag
                    // var recipes = $("<div>")

                    // var totalCalories = $("<p>").text("Calories " + results[i].recipe.calories);
                    // 	console.log(results[i].recipe.calories);
                    // var servingSize = $("<p>").text("Yields " + results[i].recipe.yield + " Servings");
                    // 	console.log(results[i].recipe.yield);


                    // var recipeImage = $("<img>");

                    // recipeImage.attr("src", results[i].recipe.image);
                    // recipeImage.attr("class", "recipes-Image");
                    // console.log(results[i].recipe.image)
                
                    // recipes.append(totalCalories);
                    // recipes.append(servingSize);
                    // recipes.append(recipeImage);
                    // console.log(recipes);
                    // $("#recipesDiv").prepend(recipes);


                    var html = '';

                    //html += '<div class="row">';
                    html += '<div class="col s4 m4">';
                    html += '<div class="card">';
                    html += '<div class="card-image">';
                    html += '<img src="' + results[i].recipe.image + '">';
                    
                    html += '<div class="card-content">';
                    html += '<p>' + results[i].recipe.label + '</p>';
                    html += '<p>"Calories "' +  parseInt(results[i].recipe.calories) + '</p>';
                    html += '<p>"Yields "' + results[i].recipe.yield + " Servings </p>"
                    html += '</div></div></div>'

                    $("#recipesDiv").prepend(html);




                }


		})


}




var queryString ='';
// Populate the rows
database2.ref().on("child_added", function(snapshot){
	console.log(snapshot.val());
	//console.log(Object.keys(snapshot.val()));

	// "For each loop" to populate the ingredient rows every one contributes
	// snapshot.forEach(function(child){
	// 	console.log("FOR LOOP");
	// 	var nameFirebase = snapshot.val().Object.keys(child);
	// 	var ingredientFirebase = child.val();
		
	// 	console.log("Firebase Name " + nameFirebase);
	// 	console.log("IngredientName " + ingredientFirebase);
	// });
	

	for(var key in snapshot.val()){
		console.log(key);
		var nameRow = key;
		var ingredientValue = snapshot.val()[key];
		queryString += ingredientValue + '%20';

		nameRow = nameRow.substring(0, nameRow.length - 1);
		console.log(nameRow)
		console.log(ingredientValue);



		var newRow = $("<tr>");
		var newNameColumn = $("<td>");
		newNameColumn.text(nameRow);

		var newIngredientColumn = $("<td>");
		newIngredientColumn.text(ingredientValue);

		newRow.append(newNameColumn,newIngredientColumn);
		$("#ingredientsTable").append(newRow);

	}


	//var queryString ='';
	edamamAPI(queryString);


})


//Reset Firebase database
$("#resetButton").on("click", resetFirebase);

function resetFirebase(){
    database2.ref().remove();
    console.log("Firebase Database Reset!");
}


//Function when Recipe card on page 2 is clicked
function recipeCardClicked() {
	console.log("Recipe Card Clicked!");
}


///THIS WORKS on Recipe Cards that have been added dynamically!!
///Function below is used to push the answer selected to the correct answers[] array index.
//$(document).on('click', 'recipeCard', recipeCardClicked);
$(".recipeCard").on("click", recipeCardClicked);
