export {}

declare global{
    
    interface Settings {
        diamondCount: number
        theme: string
        showIceBreakers: boolean
    }
    
    interface Speaker {
        id: number
        name: string
        role: string
        here: boolean
        location: string
    }
    
    interface Question {
        question: string
    }
    
    interface Quote {
        quote: string
        author: string
    }
    


}