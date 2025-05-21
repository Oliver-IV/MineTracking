package gui.mvts_mobile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import gui.mvts_mobile.dto.singleton.AppDataSingleton

class HomeFragment : Fragment() {
    private val appData = AppDataSingleton.getInstance()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        val user = view.findViewById<TextView>(R.id.txtUsername)
        user.text = appData.user?.name ?: "Usuario"

        return view
    }
}