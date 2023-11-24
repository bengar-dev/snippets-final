<template>
  <div class="min-h-screen w-full bg-primary flex flex-col items-center justify-center">
    <div class="mb-12 flex gap-4">
      <NuxtImg src="/logo/single_logo.png" alt="mysnippets logo" class="w-20 rounded-lg" />
      <div class="text-white">
        <h1 class="text-2xl uppercase">My <span class="font-bold text-secondary">snippets</span></h1>
        <p>save your snippets now !</p>
      </div>
    </div>
    <div class="w-full md:w-2/3 lg:w-2/3 xl:w-1/3">
      <MainBlock col class="py-12 px-6">
        <FormKit type="form" class="w-full flex flex-col" :actions="false" @submit="handleSubmit">
          <FormKit
            id="username-input"
            label="Username"
            type="text"
            placeholder="username"
            v-model="form.username"
            validation="required"
            wrapper-class="min-w-full"
          />
          <FormKit
            id="email-input"
            label="Email"
            type="email"
            placeholder="email"
            v-model="form.email"
            validation="required|email"
            wrapper-class="min-w-full"
          />
          <FormKit
            id="password-input"
            label="Password"
            type="password"
            placeholder="password"
            v-model="form.password"
            validation="required|length:5,16"
            wrapper-class="min-w-full"
          />
          <FormKit
            id="confirmPassword-input"
            label="Confirm password"
            type="password"
            placeholder="confirm password"
            v-model="form.confirmPassword"
            validation="required|length:5,16|confirmPassword"
            :validation-rules="{
              confirmPassword: validateConfirmPassword,
            }"
            :validation-messages="{
              confirmPassword: 'Passwords doesn\'t match',
            }"
            wrapper-class="min-w-full"
          />
          <div class="flex w-full justify-between">
            <div class="flex items-center space-x-2 text-sm">
              <p class="w-fit">Already have an account ?</p>
              <NuxtLink to="/auth" class="text-violet-500 hover:text-violet-700 font-medium">Sign-in</NuxtLink>
            </div>
            <Button type="submit" value="Sign up" variant="secondary" />
          </div>
        </FormKit>
      </MainBlock>
    </div>
  </div>
</template>
<script setup lang="ts">
import MainBlock from '~/components/blocks/MainBlock.vue';
import Button from '~/components/buttons/Button.vue';

const GqlInstance = useGql();

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validateConfirmPassword = (pass: any) => pass.value === form.value.password;

const handleSubmit = async () => {
  const parsedForm = {
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
  };

  const { register } = await GqlInstance('register', {
    registerUser: parsedForm,
  });
};
</script>
