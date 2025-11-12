interface loadingContainerProps {
    text: string;
}
export default function LoadingContainer({ text }: loadingContainerProps) {
    const firstLetter = text.charAt(0);
    const restOfText = text.slice(1);
    return (
        <div className='loading-container'>
                <div className='loading-screen' id="loading-screen">
                    <div className='flex flex-row items-center'>
                        <text className='r'>{firstLetter}</text>
                        <text className='loading-words'>{restOfText}</text>
                    </div>
                    <div className='rounded-div-wrap top'>
                        <div className='rounded-div'></div>                                
                    </div>
                    <div className='rounded-div-wrap bottom'>
                        <div className='rounded-div'></div>
                    </div>
                </div>
        </div>
    )
}