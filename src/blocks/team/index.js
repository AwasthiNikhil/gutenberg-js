import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { FormFileUpload, TextControl, TextareaControl } from '@wordpress/components';

registerBlockType('myplugin/team', {
    title: __('Team Member', 'myplugin'),
    icon: 'id-alt',
    category: 'common',

    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        imageUrl: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src',
        },
        imageAlt: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'alt',
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const { title, content, imageUrl, imageAlt } = attributes;

        // Image upload handler
        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt || media.filename,
            });
        };

        // Team Name and Description handlers
        const handleTeamNameChange = (value) => {
            setAttributes({ title: value });
        };

        const handleDescriptionChange = (value) => {
            setAttributes({ content: value });
        };

        return (
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                {/* Image upload */}
                <FormFileUpload
                    __next40pxDefaultSize
                    icon={<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 15v3.5H13V6.7l4.5 4.1 1-1.1-6.2-5.8-5.8 5.8 1 1.1 4-4v11.7h-6V15H4v5h16v-5z" /></svg>}
                    accept="image/*"
                    onChange={onSelectImage}
                >
                    Upload
                </FormFileUpload>

                {/* Team Name */}
                <TextControl
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                    label="Team Name"
                    value={title}
                    onChange={handleTeamNameChange}
                />

                {/* Description */}
                <TextareaControl
                    __nextHasNoMarginBottom
                    label="Description"
                    value={content}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        const { title, content, imageUrl, imageAlt } = attributes;

        return (
            <div className="team-member-block">
                {imageUrl && <img src={imageUrl} alt={imageAlt} style={{ maxWidth: '100%', height: 'auto' }} />}
                {title && <RichText.Content tagName="h2" value={title} />}
                {content && <RichText.Content tagName="p" value={content} />}
            </div>
        );
    },
});
