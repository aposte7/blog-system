import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadImage as uploadImageApi } from '../services/postApi'

function useUploadImage() {
	const queryClient = useQueryClient()

	const { mutate: uploadImage, isLoading: isUploading } = useMutation({
		mutationFn: (imageFile) => uploadImageApi(imageFile),
		onSuccess: () => {
			queryClient.invalidateQueries(['media'])
		},
	})

	return { uploadImage, isUploading }
}

export default useUploadImage
