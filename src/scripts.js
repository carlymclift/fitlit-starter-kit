/* eslint-disable no-undef */
const welcomeTitle = document.querySelector('.welcome');
const userCardName = document.querySelector('.name');
const userAddress = document.querySelector('.address');
const userEmail = document.querySelector('.email');
const userFriends = document.querySelector('.friends');
const h2o = document.querySelector('.h2o');
const userMiles = document.querySelector('.miles-walked');
const userMinAct = document.querySelector('.min-active');
const userSteps = document.querySelector('.steps');
const userStairs = document.querySelector('.stairs');
const userSleepTime = document.querySelector('.sleep-time');
const userSleepQuality = document.querySelector('.sleep-quality');
const friendSteps = document.querySelector('.friend-data');
const stepWinner = document.querySelector('.winner');

const userArray = userData.map((user) => new User(user));
const userRepo = new UserRepository(userArray);
let randomUser = {};
let currentHydration = {};
let currentActivity = {};
let currentSleep = {};

const chooseRandom = () => {
	const randomNum = (Math.floor(Math.random() * userRepo.data.length));
	
	randomUser = userRepo.data[randomNum];
	currentHydration = new Hydration(randomUser, hydrationData);
	currentHydration.correctHydroData();
	currentActivity = new Activity(randomUser, activityData);
	currentActivity.correctActData();
	currentSleep = new Sleep(randomUser, sleepData);
	currentSleep.correctSleepData();
}

const updateWelcome = (currentUser) => {
	randomUser.updateFriendName(userRepo);
	welcomeTitle.innerText = `Hello ${currentUser.findName()}!`;
	userCardName.innerText = `Name: ${currentUser.name}`;
	userAddress.innerText = `Address: ${currentUser.address}`;
	userEmail.innerText = `Email: ${currentUser.email}`;
	userFriends.innerText = `Friends:${currentUser.friends}`
}

const updateHydration = (currentHydro) => {
	const ouncesForDay = currentHydro.findOuncesForDay('2019/09/22');
	const ouncesForWeek = currentHydro.findOuncesForWeek('2019/09/22');
	const avgOunces = currentHydro.findHydrationAverage(hydrationData);

	h2o.innerHTML = `
		<p>Today's all FitLit user's water intake averaged at ${avgOunces} ounces.</br></br>
		Today you drank ${ouncesForDay} ounces of water.</br></br>
		Your past week's water intake:</br></br>
		Saturday: ${ouncesForWeek[5]} ounces</br></br>
		Friday: ${ouncesForWeek[4]} ounces</br></br>
		Thursday: ${ouncesForWeek[3]} ounces</br></br>
		Wednesday: ${ouncesForWeek[2]} ounces</br></br>
		Tuesday: ${ouncesForWeek[1]} ounces</br></br>
		Monday: ${ouncesForWeek[0]} ounces
		`;
}

const updateMiles = (currentAct) => {
	const todayMiles = currentAct.milesWalk('2019/09/22');
	const weekMiles = currentAct.weekMilesWalked('2019/09/22');

	userMiles.innerHTML = `
		<p>Today you walked ${todayMiles} miles.</br></br>
		In the past week you've walked:</br></br>
		Saturday: ${weekMiles[5]} miles</br></br>
		Friday: ${weekMiles[4]} miles</br></br>
		Thursday: ${weekMiles[3]} miles</br></br>
		Wednesday: ${weekMiles[2]} miles</br></br>
		Tuesday: ${weekMiles[1]} miles</br></br>
		Monday: ${weekMiles[0]} miles
		`;
}

const updateMinAct = (currentAct) => {
	const todayMin = currentAct.minActive('2019/09/22');
	const weekMin = currentAct.weekMinActive('2019/09/22');
	const allUserTodayMin = currentAct.allUserMinActive(activityData, '2019/09/22');

	userMinAct.innerHTML = `
		<p>Today you were active for ${todayMin} minutes.</br></br>
		Today's all FitLit user's were active for an average of ${allUserTodayMin} minutes.</br></br>
		Your past week's activity:</br></br>
		Saturday: ${weekMin[5]} minutes</br></br>
		Friday: ${weekMin[4]} minutes</br></br>
		Thursday: ${weekMin[3]} minutes</br></br>
		Wednesday: ${weekMin[2]} minutes</br></br>
		Tuesday: ${weekMin[1]} minutes</br></br>
		Monday: ${weekMin[0]} minutes
		`;
}

const updateSteps = (currentAct) => {
	const todaySteps = currentAct.stepGoalResult('2019/09/22');
	const avSteps = currentAct.avSteps('2019/09/22');
	const goalDays = currentAct.daysGoalAchieved();
	const allUserTodaySteps = currentAct.allUserSteps(activityData, '2019/09/22');

	userSteps.innerHTML = `
		<p>Your daily step goal is ${randomUser.dailyStepGoal} steps.</br></br>
		${todaySteps}</br></br>
		You took ${currentAct.weekAv} steps this week.</br></br>
		Past log for all the days you achieved your step goal:</br></br>
		<ul class="goal-log">${goalDaysToList(goalDays)}</ul>
		Today all FitLit user's averaged ${allUserTodaySteps} steps.
		`;
}

const goalDaysToList = (goalDays) => goalDays
	.map(day => `<li>${day}</li>`).join('');

const updateStairs = (currentAct) => {
	const stairRecord = currentAct.stairRecord();
	const allUserStairs = currentAct.allUserStairsClimbed(activityData, '2019/09/22');

	userStairs.innerHTML = `
		<p>${stairRecord}</br></br>
		Today all FitLit user's averaged ${allUserStairs} flights climbed.
		`;
}

const updateSleepTime = (currSleep) => {
	const todaySleep = currSleep.findUserSleepForDay('2019/09/22');
	const weekSleep = currSleep.findUserSleepForWeek('2019/09/22');
	const avSleep = currSleep.findUserAverageSleep(sleepData);
	const mostSleep = currSleep.findMostSleepUser(sleepData, '2019/09/22', userRepo);
	const avSleepTime = currSleep.findAverageSleep();

	userSleepTime.innerHTML = `
		<p>On average you sleep ${avSleep} hours per night</br></br>
		All FitLit user's average ${avSleepTime} hours per night</br></br>
		Last night you slept for ${todaySleep} hours.</br></br>
		Your past week sleeplog:</br></br>
		Saturday: ${weekSleep[5]} hours</br></br>
		Friday: ${weekSleep[4]} hours</br></br>
		Thurdsay: ${weekSleep[3]} hours</br></br>
		Wednesday: ${weekSleep[2]} hours</br></br>
		Tuesday: ${weekSleep[1]} hours</br></br>
		Monday: ${weekSleep[0]} hours</br></br>
		FitLit's sleepiest user last night was: ${mostSleep}.
	`
}

const updateSleepQuality = (currSleep) => {
	const todayQuality = currSleep.findUserSleepQualityForDay('2019/09/22');
	const weekQuality = currSleep.findUserQualityForWeek('2019/09/22');
	const avQuality = currSleep.findUserAverageQuality(sleepData);
	const bestSleep = currSleep.findBestSleepers(sleepData, '2019/09/22', userRepo);
	const avSleepQuality = currSleep.findAverageQuality();

	userSleepQuality.innerHTML = `
		<p>On a 1-5 scale, on average your sleep quality is at a ${avQuality}.</br></br>
		Amongst all FitLit users, the average sleep quality is ${avSleepQuality}.</br></br>
		Last night your sleep quality was ${todayQuality}.
		Your past week sleep quality:</br></br>
		Saturday: ${weekQuality[5]}</br></br>
		Friday: ${weekQuality[4]}</br></br>
		Thurdsay: ${weekQuality[3]}</br></br>
		Wednesday: ${weekQuality[2]}</br></br>
		Tuesday: ${weekQuality[1]}</br></br>
		Monday: ${weekQuality[0]}</br></br>
		FitLit users who scored above a 3 in sleep quality this last week:</br></br>
		${bestSleep}
	`
}

const challenge = (currentAct) => {
	updateSteps(currentAct);
	currentAct.avSteps('2019/09/22');
	currentAct.friendsSteps('2019/09/22', activityData, userRepo);

	for (let i =0; i< currentAct.friendsWeekAv.length; i++) {
		friendSteps.insertAdjacentHTML('beforeend', `<li>${currentAct.friendsWeekAv[i].user} took ${currentAct.friendsWeekAv[i].weekTotal} steps this week.</li></br>`);
	}

	const weekWinner = currentAct.challengeWinner();
	if (weekWinner.user === randomUser.id) {
		stepWinner.innerHTML = `Congrats, you win this week! You took ${weekWinner.weekTotal} steps!</br></br>`;
	} else {
		stepWinner.innerHTML = `${weekWinner.user} wins this week! They took ${weekWinner.weekTotal} steps!</br></br>`;
	}
}

const updateOnload = () => {
	chooseRandom();
	updateWelcome(randomUser);
	updateHydration(currentHydration);
	updateMiles(currentActivity);
	updateMinAct(currentActivity);
	updateSteps(currentActivity);
	updateStairs(currentActivity);
	updateSleepTime(currentSleep);
	updateSleepQuality(currentSleep);
	challenge(currentActivity);
}

window.addEventListener('load', updateOnload);

var ctx = document.getElementById('myChart').getContext('2d');
// let randomUser = currentUser;
let hydration = new Hydration(randomUser, hydrationData);
const hydrationChart = hydration.findOuncesForWeek('2019/09/22');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Saturday', 'Friday', 'Thurdsay', 'Wednesday', 'Tuesday', 'Monday', 'Today'],
        datasets: [{
            label: 'Hydration for the past week:',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: hydrationChart
        }]
    },

    // Configuration options go here
    options: {}
});