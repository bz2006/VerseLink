import axios from 'axios'

const Presenter = async (bookNum:number,chapterNum:number,verseNum:number) => {
    try {
        const present = await axios.get(`http://192.168.1.6:50010/bible_present.html?command=8&value=${bookNum}:${chapterNum}:${verseNum}`)
        console.log("Presenting")
    } catch (error) {
        console.log(error)
    }
}

export default Presenter