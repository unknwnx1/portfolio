import { createClient } from '@supabase/supabase-js'

export default class ApiSupabase {
  constructor (urlSupabase, apiSupabase) {
    this.url = urlSupabase
    this.api = apiSupabase
    this.client = createClient(this.url, this.api)
  }
  async getCountData (table) {
    try {
      const { data, error } = await this.client.from(table).select('*')
      if (data) {
        return data.length
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }
  async fetchDataAll (table) {
    try {
      const { data, error } = await this.client.from(table).select('*')
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }

  async fetchWithPagination (table, minRange, maxRange) {
    try {
      const { data, error } = await this.client.from(table).select('*').range(minRange, maxRange)
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }
  async fetchDataTarget (table, id) {
    try {
      const { data, error } = await this.client.from(table).select('*').eq('id', id)
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }
  async insertData (table, formData) {
    try {
      const { data, error } = await this.client.from(table).insert([formData]).select()
      if (data) {
        return data
      } else {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateData (table, id, formData) {
    try {
      const { data, error } = await this.client.from(table).update(formData).eq('id', id)
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteData (table, id) {
    try {
      const { error } = await this.client.from(table).delete().eq('id', id)
      return error
    } catch (error) {
      console.log(error)
    }
  }

  async login (email, password) {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }
  async signOut () {
    try {
      const { error } = await this.client.auth.signOut()
      return error
    } catch (error) {
      console.log(error)
    }
  }

  async uploadImage (table, folder, name, file) {
    try {
      const { data, error } = await this.client.storage
        .from(table)
        .upload(`${folder}/${name}`, file, {
          cacheControl: '3600',
          upsert: false
        })
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateImage (table, folder, name, file) {
    try {
      const { data, error } = await this.client.storage
        .from(table)
        .update(`${folder}/${name}`, file, {
          cacheControl: '3600',
          upsert: false
        })
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteImage (table, folder, name) {
    try {
      const { data, error } = await this.client.storage.from(table).remove([`${folder}/${name}`])
      if (data) {
        return data
      } else {
        return error
      }
    } catch (error) {
      console.log(error)
    }
  }
}
