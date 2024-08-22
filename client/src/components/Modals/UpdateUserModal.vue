<script setup lang="ts">
import AlwaysDisableInput from '@/components/Form/AlwaysDisableInput.vue';
import FormWrapper from '@/components/Form/FormWrapper.vue';
import FormInput from '@/components/Form/Input.vue';
import $useFetch from '@/composables/$useFetch';
import { useToast } from '@/composables/useToast';
import { useUserStore } from '@/store/user';
import type { BasePayload, User } from '@/types';
import { reactive, ref } from 'vue';
import Button from '../Button.vue';
import FileUploader from '../Form/FileUploader.vue';

const userStore = useUserStore();

const isFormChanged = ref(false);
const { $toast } = useToast();

const props = defineProps({
  cancelFn: {
    type: Function,
    default: () => {},
  },
  confirmFn: {
    type: Function,
    default: () => {},
  },
});

const uploadedFile = ref<null | File>(null);
const updatedFields = reactive({
  name: userStore.currentUser?.name || '',
});

const isUpdating = ref(false);

const updateUserDetails = async () => {
  if (!isFormChanged.value) return;

  let uploadData: any = updatedFields;
  if (uploadedFile.value) {
    const formData = new FormData();
    formData.append('profilePicture', uploadedFile.value);
    for (let field in uploadData) {
      formData.append(field, uploadData[field]);
    }
    uploadData = formData;
  }

  isUpdating.value = true;
  const { data, error } = await $useFetch('user/update').post(uploadData).json<BasePayload<User>>();
  isUpdating.value = false;
  if (error.value) {
    return $toast.error(error.value.message || 'Some problem happened in updating user details', {
      timeout: 5000,
    });
  }

  if (data.value?.data?.email) {
    $toast.success('Your details were updated successfully', { timeout: 5000 });
    userStore.setUser(data.value.data as User);
    return props.confirmFn();
  }
};

const handleUploadNewProfilePicture = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadedFile.value = file;
};
</script>

<template>
  <FormWrapper
    v-if="userStore.currentUser"
    title="User info"
    icon="i-eva:person-outline"
    class="modal-content-width"
  >
    <form @submit.prevent="updateUserDetails" class="space-y-8" @input="isFormChanged = true">
      <FormInput
        label="Name"
        name="name"
        id="name"
        placeholder="Enter your name"
        v-model="updatedFields.name"
      />
      <AlwaysDisableInput label="Email"> {{ userStore.currentUser?.email }} </AlwaysDisableInput>
      <FileUploader
        name="profilePicture"
        id="profilePicture"
        :defaultSrc="userStore.profilePicture"
        @change="handleUploadNewProfilePicture"
        accept="image/png,image/jpeg,image/jpg,image/svg"
      />
      <div class="flex items-center justify-end gap-3">
        <Button type="button" styleType="primary" @click="props.cancelFn" :disabled="isUpdating">
          Cancel
        </Button>
        <Button type="submit" :disabled="!isFormChanged" :loading="isUpdating"> Update </Button>
      </div>
    </form>
  </FormWrapper>
</template>
