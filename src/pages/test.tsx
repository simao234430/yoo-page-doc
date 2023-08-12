import { IconCopy,IconLarkColor,IconDownCircle } from '@arco-design/web-react/icon';
 
export default function Test( ) {
    return (
        <div >
        <IconCopy className='test'   ></IconCopy>
        <IconDownCircle  fill='white'  stroke='black' />
        <IconLarkColor />
        <style jsx>{`
        
            svg path  .test{
                fill: none;
            }
    
        
  
              `}</style>
        </div>


    )
  }
  