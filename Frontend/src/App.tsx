import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App(){
    return <div className="p-4">

    <div className="flex justify-end gap-4">
    <Button variant="primary" text = "Add content" startIcon={<PlusIcon/>}></Button>
    <Button variant="secondary" text = "Share" startIcon={<ShareIcon/>}></Button>
    </div>
    <div className="flex gap-4">
    <Card type = "twitter" 
    link="https://x.com/mufaddal_vohra/status/2034924865917247593"
    title="First Tweet"
    ></Card>

    <Card type = "youtube" 
    link="https://www.youtube.com/watch?v=eyklsgOClJA"
    title="First youtube video"
    ></Card>
    </div>

    </div>
}

export default App