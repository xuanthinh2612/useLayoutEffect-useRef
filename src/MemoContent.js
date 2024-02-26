import { memo } from "react";


function MemoContent({handleIncreaseFromChild}) {

    console.log("re-render");
    return(
        <>
            <div>
                <h1>Hello anh Thịnh</h1>
            </div>
            <button
                onClick={handleIncreaseFromChild}
            >Increase</button>
        </>
    )
}

export default memo(MemoContent)