import React from 'react';
import { MdAccountBalance as icon } from 'react-icons/md';
import S from '@sanity/desk-tool/structure-builder';
import { DocumentBuilder } from '@sanity/structure/lib/Document';

// build a custom sidebar

export default function Sidebar(){
    return S.list().title(`slick's slices`).items([
        // creat a new sub item
        S.listItem()
            .title('Home Page')
            .icon(() => <strong>🐶</strong>)
            .child(
                S.editor()
                .schemaType('storeSettings')
                // make a new document ID, so we don't have a random string of numbers
                .documentId('downtown')
            ),
            // add in the rest of our dcument items
            ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),
    ]);
}