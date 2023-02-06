import React from 'react';
import {GetStaticProps} from "next";
import client from '../../sanity'
import Header from "@/components/Header";
import {Post} from "@/typings";
import {PortableText} from '@portabletext/react'
import RichTextComponents from "@/components/RichTextComponents";

interface Props {
    post: Post
}
const Post = ({post} : Props) => {
    return (
        <div>
            <Header />
            <img className={'w-full h-40 object-cover'} src={post.imageUrl!} alt={''}/>
            <div className={'max-w-3xl mx-auto p-5'}>
                <h1 className={'text-3xl mt-10 mb-3'}>{post.title}</h1>
                <h2 className={'text-xl fontlight text-gray-500 mb-2'}>Descripción</h2>
                <div className={'flex items-center space-x-2'}>
                    <img className={'h-10 w-10 rounded-full'} src={post.author.imageUrl!} alt={''}/>
                    <p className={'font-extralight text-sm'}>Blog post by <span className={'text-green-600'}>{post.author.name}</span> - published at{" "} {new Date(post._createdAt).toLocaleString()}</p>

                </div>
                <div className={'mt-10'}>
                    <PortableText value={post.body!}  components={RichTextComponents}/>
                </div>
            </div>


        </div>
    );
};

export const getStaticPaths = async () => {
    const query = `*[_type == 'post']{
          _id,
          slug {
             current
          },  
        }`
    const posts = await client.fetch(query)
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current

        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const query = `*[_type == 'post' && slug.current == $slug][0]{
                      _id,
                      _createdAt,
                      title,
                        author-> {
                          name, 
                          "imageUrl": image.asset->url,
                        },
                        'comments': *[
                            _type == "comment" &&
                            post._ref == ^._id &&
                            approved == true
                        
                        ],
                        "imageUrl": mainImage.asset->url,
                        slug,
                        body
                    }`
    const post = await client.fetch(query, {slug: context.params?.slug})
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post
        },
        revalidate: 60,
    }

}

export default Post;