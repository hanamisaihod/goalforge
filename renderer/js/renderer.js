/* <div class="add-quest-inner-container"> 
                <input type="text" id="add-quest-name" name="add-quest-name" placeholder="QUEST DESCRIPTION">
            </div>
            <div class="add-quest-inner-container">
                <label for="add-quest-timed-time">TIME: </label>
                <input type="number" id="add-quest-time" name="add-quest-time">
                <label for="add-quest-timed-xp">XP: </label>
                <input type="number" id="add-quest-xp" name="add-quest-xp">
                <label for="add-quest-timed-gold">GOLD: </label>
                <input type="number" id="add-quest-gold" name="add-quest-gold">
                <button type="submit" class="add-quest-button">ADD</button>*/


const addQuestForm = document.querySelector('#add-quest-form');


function addQuest (e){
    e.preventDefault();

    const questName = document.getElementById('add-quest-name').value;
    let questTime = document.getElementById('add-quest-time').value;
    const questXp = document.getElementById('add-quest-xp').value;
    const questGold = document.getElementById('add-quest-gold').value;

    if (questTime === ''){
        questTime = '0';
    }

    if (questXp === '' || questGold === ''){
        console.log("Please enter detail of quest!");
        return;
    }

    ipcRenderer.send('addQuest', {
        questName,
        questTime,
        questXp,
        questGold
    });
}

  


addQuestForm.addEventListener('submit', addQuest)