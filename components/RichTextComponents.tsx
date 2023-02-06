import React from 'react';

const RichTextComponents = {
    types: {
        h1: (props: any) => <h1 className={'text-2xl font-bold my-5'}>{props.children}</h1>,
        h2: (props: any) => <h2 className={'text-xl font-bold my-5'}>{props.children}</h2>,
        li: (props: any) => <li className={'ml-4 list-disc'}>{props.children}</li>,
        link: ({href, childen}: any) =>(
            <a href={href} className={'text-blue-500 hover:underline'}>{childen}</a>
        ),
    },


}


export default RichTextComponents;