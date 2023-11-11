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
        <form
          class="flex flex-col gap-4"
          @submit="
            (e) => {
              e.preventDefault();
              console.log('hello world', form);
            }
          "
        >
          <InputValue id="username-input" type="text" placeholder="username" v-model="form.username" />
          <InputValue id="email-input" type="email" placeholder="email" v-model="form.email" />
          <InputValue id="password-input" type="password" placeholder="password" v-model="form.password" />
          <InputValue
            id="passwordConfirm-input"
            type="password"
            placeholder="confirm password"
            v-model="form.confirmPassword"
          />
          <div class="flex w-full justify-between">
            <div class="flex items-center space-x-2 text-sm">
              <p class="w-fit">Already have an account ?</p>
              <NuxtLink to="/auth" class="text-violet-500 hover:text-violet-700 font-medium">Sign-in</NuxtLink>
            </div>
            <Button type="submit" value="Sign up" variant="secondary" />
          </div>
        </form>
      </MainBlock>
    </div>
  </div>
</template>
<script setup lang="ts">
import MainBlock from '~/components/blocks/MainBlock.vue';
import InputValue from '~/components/inputs/InputValue.vue';
import Button from '~/components/buttons/Button.vue';

interface FormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const form = ref<FormProps>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});
</script>
