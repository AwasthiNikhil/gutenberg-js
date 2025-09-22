import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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

		const onSelectImage = (media) => {
			setAttributes({
				imageUrl: media.url,
				imageAlt: media.alt || media.filename,
			});
		};

		return (
			<div className="team-member-block-editor" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
				
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectImage}
						allowedTypes={['image']}
						render={({ open }) => (
							<div style={{ marginBottom: '20px' }}>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt={imageAlt}
										style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '10px' }}
									/>
								) : null}
								<Button onClick={open} isPrimary>
									{imageUrl ? __('Replace Image', 'myplugin') : __('Upload Image', 'myplugin')}
								</Button>
							</div>
						)}
					/>
				</MediaUploadCheck>
            
                        </div>

				<RichText
					tagName="h2"
					placeholder={__('Enter team member name…', 'myplugin')}
					value={title}
					onChange={(value) => setAttributes({ title: value })}
					className="team-member-title"
				/>

				<RichText
					tagName="p"
					placeholder={__('Enter role or description…', 'myplugin')}
					value={content}
					onChange={(value) => setAttributes({ content: value })}
					className="team-member-description"
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
