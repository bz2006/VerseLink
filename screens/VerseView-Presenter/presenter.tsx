import axios from 'axios'

const Presenter = async (bookNum: number, chapterNum: number, verseNum: number,connectionUrl:string) => {
    try {
        console.log(`http://${connectionUrl}/bible_present.html?command=8&value=${bookNum}:${chapterNum}:${verseNum}`)

            const present = await axios.get(`http://${connectionUrl}/bible_present.html?command=8&value=${bookNum}:${chapterNum}:${verseNum}`)
            console.log("Presenting")

    } catch (error) {
        console.log(error)
    }
}

export default Presenter