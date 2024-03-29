import React from 'react'
import UpdateDocsType from '@/types/update.type.'
import { decodeContents, encodeContents } from '@/utils/document/requestContents'
import Docs from '@/types/docs.type'
import { GetStaticProps } from 'next'
import { Storage } from '@/lib/storage/'
import { NextSeo } from 'next-seo'
import { IFileTypes } from '@/components/DragDrop'
import httpClient from '@/lib/httpClient'
import FileListArray from '@/types/filelistArray.type'
import useUser from '@/hooks/useUser'
import UpdateLayout from '@/layout/UpdateLayout'
import { toast } from 'react-toastify'
import useConfig from '@/hooks/useConfig'
import useUpdateDocsMutation from '@/features/UpdateDocsFeature'

interface SinglDocsPropsType {
	defaultDocs: Docs
	title: string
}

const Update = ({ defaultDocs }: SinglDocsPropsType) => {
	const { isLogined } = useUser()
	const textareaRef = React.useRef<HTMLTextAreaElement>(null)
	const { seoConfig } = useConfig({
		title: `부마위키 문서편집 - ${defaultDocs.title}`,
		description: `"${defaultDocs.title}" 문서편집 페이지입니다.`,
	})

	const [parentFiles, setParentFiles] = React.useState<IFileTypes[]>([])
	const [isOnAutoComplete, setIsOnAutoComplete] = React.useState(JSON.parse(Storage.getItem('autoComplete') || 'true'))
	const [docs, setDocs] = React.useState<UpdateDocsType>({
		title: defaultDocs.title,
		contents: decodeContents(defaultDocs.contents || ''),
		files: [],
	})

	const { mutate } = useUpdateDocsMutation(docs.title)

	const onClickAutoComplete = () => {
		Storage.setItem('autoComplete', `${!isOnAutoComplete}`)
		setIsOnAutoComplete(!isOnAutoComplete)
		textareaRef?.current?.focus()
	}

	const onClickUpdateDocs = async () => {
		if (!isLogined) {
			toast.error('로그인 후 이용 가능한 서비스입니다.')
			return
		}
		if (!docs.contents) {
			toast.error('문서가 비어있습니다!')
			return
		}
		mutate({
			title: docs.title,
			data: {
				contents: docs.contents,
				files: parentFiles,
			},
		})
	}

	return (
		<>
			<NextSeo {...seoConfig} />
			<UpdateLayout
				docs={docs}
				setDocs={setDocs}
				setFiles={(file: FileListArray[]) => setParentFiles(file)}
				onClickAutoComplete={onClickAutoComplete}
				isOnAutoComplete={isOnAutoComplete}
				textareaRef={textareaRef}
				onClickUpdateDocs={onClickUpdateDocs}
			/>
		</>
	)
}

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

const getApiDocs = async (docsName: string) => {
	try {
		return (await httpClient.docs.getByTitle(docsName)).data
	} catch (err) {
		return false
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { params } = context

	const res = await getApiDocs(params?.title as string)

	return {
		props: {
			defaultDocs: res,
			title: params?.title,
		},
	}
}

export default Update
