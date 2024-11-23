<script>
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    company: null,
    loading: false
  }),

  actions: {
    async fetchCompanyProfile() {
      const client = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value) return

      try {
        const { data, error } = await client
          .from('company_profiles')
          .select('*')
          .eq('user_id', user.value.id)
          .single()

        if (error) throw error
        this.company = data
      } catch (error) {
        console.error('Error fetching company profile:', error)
      }
    },

    async updateCompanyProfile(profile) {
      const client = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value) return

      try {
        const { error } = await client
          .from('company_profiles')
          .update(profile)
          .eq('user_id', user.value.id)

        if (error) throw error
        this.company = { ...this.company, ...profile }
      } catch (error) {
        console.error('Error updating company profile:', error)
        throw error
      }
    }
  }
})
</script>