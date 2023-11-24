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
        <FormKit type="form" id="sign-in-form" class="flex flex-col gap-4" :actions="false" @submit="handleSubmit">
          <FormKit
            id="identifier-input"
            label="Email / username"
            type="text"
            placeholder="email / username"
            v-model="form.identifier"
            validation="required"
            wrapper-class="min-w-full"
          />
          <FormKit
            id="password-input"
            label="Password"
            type="password"
            placeholder="password"
            v-model="form.password"
            validation="required"
            wrapper-class="min-w-full"
          />
          <div class="flex w-full justify-between">
            <div class="flex items-center space-x-2 text-sm">
              <p class="w-fit">No account ?</p>
              <NuxtLink to="/auth/register" class="text-violet-500 hover:text-violet-700 font-medium">Sign-up</NuxtLink>
            </div>
            <Button type="submit" value="Sign in" variant="secondary" />
          </div>
        </FormKit>
      </MainBlock>

      <Separator value="Or" class="my-12" />

      <div class="flex justify-center w-full">
        <Button type="button" value="Sign-in with GitHub" variant="github" icon="uil:github" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainBlock from '~/components/blocks/MainBlock.vue';
import Button from '~/components/buttons/Button.vue';
import Separator from '~/components/ui/Separator.vue';
import { useUtility } from '~/composable/useUtility';

const GqlInstance = useGql();

const form = ref({
  identifier: '',
  password: '',
});

const handleSubmit = async () => {
  const { signIn } = await GqlInstance('signIn', { signUser: form.value });
  //TODO: handle signin jwt
};
</script>
